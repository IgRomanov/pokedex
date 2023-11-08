import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId } from "react";
import { GridContainer } from "../Grid/styled";
import { DraggableCard } from "../DraggableCard";

const CardsColumn = observer(({ currentCards }) => {
    const cardId = useId();

    return (
        <GridContainer $color="blue">
            {currentCards &&
                (currentCards.length > PageStore.currentLimit ? currentCards.slice(PageStore.currentOffset, PageStore.currentLimit * PageStore.currentPage) : currentCards).map((pokemon, index) => (
                    <DraggableCard key={`${cardId}-${index}`} id={`${cardId}-${index}`} pokemon={pokemon}/>      
                ))
            }
        </GridContainer>
    )
});

export default CardsColumn;