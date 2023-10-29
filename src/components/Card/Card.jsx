import { useEffect, useId, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../utils/const";
import axios from "axios";

const CardWrapper = styled.div`
    padding: 18px 10px;
    background-color: #E6FCFC;
    border: 1px solid black;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 240px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
`;

const ListElement = styled.li`
    text-shadow: 1px 1px 2px red;
`;  

const Card = ({ name, url }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [types, setTypes] = useState([]);
    const [attackValue, setAttackValue] = useState(0);
    const [id, setId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${url}`)
            .then(res => res.data)
            .then((data) => {
                setImgSrc(data.sprites.front_default);
                setTypes(data.types);
                setAttackValue(data.stats[1].base_stat);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [url])
    return (
        <CardWrapper>
                <span>{name}</span>
                {
                    isLoading ?
                    <span className="loader"></span>
                    :
                    <img src={imgSrc} alt={name}></img>
                }
            <div>
            <List>
                {
                    types.map((type, index) => (
                        <ListElement key={`${id}-${index}`}>{type.type.name}</ListElement>
                    ))
                }
            </List>
            <span>Атака: {attackValue}</span>
            </div>
        </CardWrapper>
    )
}

export default Card;