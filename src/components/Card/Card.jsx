import { CardWrapper, List, ListElement, Avatar } from "./styled";
import { useEffect, useId, useState } from "react";
import axios from "axios";
import PokemonPopup from "../PokemonPopup";
import { observer } from "mobx-react-lite";

const Card = observer(({ pokemon }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const getCardData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(pokemon.url);
            updateCardInfo({ img: data.sprites.front_default, types: data.types, attack: data.stats[1].base_stat });
            updatePopupInfo({ weight: data.weight, height: data.height, baseExperience: data.base_experience })
        } catch (e) {
            console.log(e);
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

    const handleCardCLick = (e) => {
        console.log(e.target)
        setIsPopupVisible(!isPopupVisible);
    };

    useEffect(() => {
        getCardData();
    }, [pokemon]);

    return (
        <CardWrapper onClick={handleCardCLick} >
            <h2>{pokemon.name}</h2>
            {
                isLoading ?
                    <span className="loader"/>
                    :
                    <Avatar src={cardInfo.img} alt={pokemon.name} loading="lazy"/>
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