import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useEffect, useId, useState } from "react";
import { GridContainer } from "../Grid/styled";
import { DropCard } from "../DropCard.jsx/index.js";
import PokemonsStore from "../../store/PokemonsStore";

const LocalStorageCardsColumn = observer(() => {
    const [localStorageCards, setLocalStorageCards] = useState([]);
    const cardId = useId();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const localCards = JSON.parse(localStorage.getItem('cards'));
        const cardData = JSON.parse(e.dataTransfer.getData("card"));
        const isExisted = localCards.some(localCard => localCard.name === cardData.name);
        if (!isExisted) {
            localCards.push(cardData);
            localStorage.setItem('cards', JSON.stringify(localCards));
            setLocalStorageCards([...localStorageCards, cardData]);
            PokemonsStore.setLastAddedCard(cardData);
        }
    };

    useEffect(() => {
        const localCards = JSON.parse(localStorage.getItem('cards'));
        setLocalStorageCards(localCards);
    }, []);
    
    return (
        <GridContainer onDragOver={handleDragOver} onDrop={handleDrop}>
            {localStorageCards &&
                (localStorageCards.length > PageStore.currentLimit ? localStorageCards.slice(PageStore.currentOffset, PageStore.currentLimit * PageStore.currentPage) : localStorageCards).map((pokemon, index) => {
                    return (
                        <DropCard key={`${cardId}-${index}`} name={pokemon.name} img={pokemon.img} types={pokemon.types} attack={pokemon.attack}/>
                    )

                })
            }
        </GridContainer>
    )
});

export default LocalStorageCardsColumn;