import { CardWrapper, List, ListElement, Avatar } from "./styled";
import { useEffect, useId, useState, useCallback } from "react";
import axios from "axios";
import PokemonPopup from "../PokemonPopup";
import { observer } from "mobx-react-lite";

const Card = observer(({ pokemon, handleCardClick, isActive, id }) => {
    const [isLoading, setIsLoading] = useState(false);

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

    const typeId = useId();

    const getCardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(pokemon.url);
            updateCardInfo({ img: data.sprites.front_default, types: data.types, attack: data.stats[1].base_stat });
            updatePopupInfo({ weight: data.weight, height: data.height, baseExperience: data.base_experience });
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [pokemon.url]);

    useEffect(() => {
        getCardData();
    }, [pokemon, getCardData]);

    return (
        <CardWrapper onClick={() => handleCardClick(id)} id={id} style={{ opacity: isLoading ? '.7' : 1 }} $cursor="pointer">
            <h2>{!isLoading && pokemon.name}</h2>
            {
                isLoading ?
                    <span className="loader" />
                    :
                    cardInfo.img && <Avatar src={cardInfo.img} alt={pokemon.name} loading="lazy" />
            }
            <div>
                <List>
                    {
                        !isLoading && cardInfo.types && cardInfo.types.map((type, index) => (
                            <ListElement key={`${typeId}-${index}`}>{type.type.name}</ListElement>
                        ))
                    }
                </List>
                {!isLoading && cardInfo.attack && <span>Attack: {cardInfo.attack}</span>}
            </div>
            <PokemonPopup isVisible={isActive} popupInfo={popupInfo} />
        </CardWrapper>
    )
})

export default Card;