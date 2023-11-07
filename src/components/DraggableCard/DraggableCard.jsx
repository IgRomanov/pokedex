import { CardWrapper, Avatar, List, ListElement } from "../Card/styled";
import { useState, useEffect } from "react";
import { useId } from "react";
import axios from "axios";

const DraggableCard = ({ pokemon, id }) => {
    const [isLoading, setIsLoading] = useState(false);
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

    const getCardData = async () => {
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
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData("card", JSON.stringify({
            name: pokemon.name,
            img: cardInfo.img,
            types: cardInfo.types,
            attack: cardInfo.attack,
            weight: popupInfo.weight,
            height: popupInfo.height,
            baseExperience: popupInfo.baseExperience,
        }));
    };

    useEffect(() => {
        getCardData();
    }, [pokemon]);

    return (
        <CardWrapper draggable onDragStart={(e) => handleDragStart(e)} style={{ opacity: isLoading ? '.7' : 1 }} $cursor="move">
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
        </CardWrapper>
    );
}

export default DraggableCard;