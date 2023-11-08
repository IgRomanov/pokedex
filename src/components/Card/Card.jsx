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
        maxStat: null,
    });

    const [popupInfo, updatePopupInfo] = useState({
        weight: null,
        height: null,
        baseExperience: null,
    });

    const typeId = useId();

    const checkMaxValue = (value) => {
        if (Array.isArray(value)) {
            return value[0];
        }
        return value;
    };

    const getCardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(pokemon.url);
            const stats = [...data.stats];
            const maxValue = Math.max(...stats.map(stat => stat.base_stat));
            const maxStats = stats.filter(stat => stat.base_stat === maxValue);
            const maxStat = checkMaxValue(maxStats);
            updateCardInfo({ img: data.sprites.front_default, types: data.types, maxStat: maxStat});
            console.log(maxStat)
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
                {!isLoading && cardInfo.maxStat && <span>{cardInfo.maxStat.stat.name.replaceAll('-', ' ') }: {cardInfo.maxStat.base_stat}</span>}
            </div>
            <PokemonPopup isVisible={isActive} popupInfo={popupInfo} />
        </CardWrapper>
    )
})

export default Card;