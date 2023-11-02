import { useEffect, useId, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PokemonPopup from "../PokemonPopup/PokemonPopup";
import { observer } from "mobx-react-lite";
import PokemonsStore from "../../store/PokemonsStore";

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
    const getImgs = async () => {
        try {
            const { data } = await axios.get(pokemon.url);
            updateCardInfo({ img: data.sprites.front_default, types: data.types, attack: data.stats[1].base_stat });
            updatePopupInfo({ weight: data.weight, height: data.height, baseExperience: data.base_experience })
        } catch (e) {
            console.log(e);
            setIsLoading(true);
        } finally {
            setIsLoading(false);
        }
    };

    const typeId = useId();

    const [cardInfo, updateCardInfo] = useState({
        img: '',
        types: [],
        attack: null,
    });

    const [popupInfo, updatePopupInfo] = useState({
        weight: null,
        height: null,
        baseExperience: null,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleCardCLick = (e) => {
        setIsPopupVisible(!isPopupVisible);
    }

    useEffect(() => {
        setIsLoading(true);
        getImgs();
    }, [pokemon, PokemonsStore.selectedTypes]);

    return (
        <CardWrapper onClick={handleCardCLick}>
            <h2>{pokemon.name}</h2>
            {
                isLoading ?
                    <span className="loader"></span>
                    :
                    <Avatar src={cardInfo.img} alt={pokemon.name} loading="lazy"></Avatar>
            }
            <div>
                <List>
                    {
                        cardInfo.types.map((type, index) => (
                            <ListElement key={`${typeId}-${index}`}>{type.type.name}</ListElement>
                        ))
                    }
                </List>
                <span>Attack: {cardInfo.attack}</span>
            </div>
            <PokemonPopup isVisible={isPopupVisible} popupInfo={popupInfo} />
        </CardWrapper>
    )
})

export default Card;