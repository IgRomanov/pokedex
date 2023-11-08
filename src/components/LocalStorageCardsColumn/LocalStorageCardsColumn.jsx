import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useEffect, useId, useState } from "react";
import { GridContainer } from "../Grid/styled";
import { DropCard } from "../DropCard.jsx/index.js";
import PokemonsStore from "../../store/PokemonsStore";
import { useDrop } from "react-dnd";

const LocalStorageCardsColumn = observer(() => {
    const [localStorageCards, setLocalStorageCards] = useState([]);
    const cardId = useId();

    const handleDrop = (item) => {
        const localCards = JSON.parse(localStorage.getItem('cards'));
        const isExisted = localCards.some(localCard => localCard.name === item.name);
        if (!isExisted) {
            localCards.push(item);
            localStorage.setItem('cards', JSON.stringify(localCards));
            setLocalStorageCards([...localStorageCards, item]);
            PokemonsStore.setLastAddedCard(item);
        }
    }

    const [{}, drop] = useDrop({
        accept: 'card',
        drop: (item) => handleDrop(item),
    })

    useEffect(() => {
        const localCards = JSON.parse(localStorage.getItem('cards'));
        setLocalStorageCards(localCards);
    }, []);
    return (
        <GridContainer $color={"blue"} ref={drop}>
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