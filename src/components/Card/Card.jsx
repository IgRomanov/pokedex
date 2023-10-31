import { useEffect, useId, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PokemonPopup from "../PokemonPopup/PokemonPopup";
import { observer } from "mobx-react-lite";

const CardWrapper = styled.div`
    & {
        position: relative;
        padding: 18px 10px;
        background-color: #ffffff;
        border: 3px solid purple;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        color: black;
        transition: background-color ease-in-out .4s,
                    border ease-in-out .4s;
    }
    &:hover {
        background-color: rgba(255, 255, 255, .8);
        border: 3px solid orange;
    }

`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
`;

const ListElement = styled.li`
    text-shadow: 1px 1px 2px #faba65;
    color: #faba65;
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
`

const Card = observer(({ pokemon }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [img, setImg] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const typeId = useId();

    useEffect(() => {
        setIsLoading(true);
        const getImgs = async () => {
            try {
                const { data } = await axios.get(pokemon.img);
                setImg(`data:image/jpg;base64${data}`);
            } catch (e) {
                console.log(e);
                setIsLoading(true);
            } finally {
                setIsLoading(false);
            }
        }
        getImgs();
    }, [])

    return (
        <CardWrapper onMouseEnter={() => setIsPopupVisible(true)} onMouseLeave={() => setIsPopupVisible(false)}>
            <h2>{pokemon.name}</h2>
            {
                isLoading ?
                    <span className="loader"></span>
                    :
                    <Avatar src={pokemon.img} alt={pokemon.name}></Avatar>
            }
            <div>
                <List>
                    {
                        pokemon.types.map((type, index) => (
                            <ListElement key={`${typeId}-${index}`}>{type.type.name}</ListElement>
                        ))
                    }
                </List>
                <span>Attack: {pokemon.attack}</span>
            </div>
            <PokemonPopup isVisible={isPopupVisible} height={pokemon.height} weight={pokemon.weight} baseExperience={pokemon.baseExperience} />
        </CardWrapper>
    )
})

export default Card;