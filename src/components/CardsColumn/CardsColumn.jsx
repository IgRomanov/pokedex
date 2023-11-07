import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId } from "react";
import { GridContainer } from "../Grid/styled";
import { DraggableCard } from "../DraggableCard";

const CardsColumn = observer(({ currentCards }) => {
    const cardId = useId();

    return (
        <GridContainer>
            {currentCards &&
                (currentCards.length > PageStore.currentLimit ? currentCards.slice(PageStore.currentOffset, PageStore.currentLimit * PageStore.currentPage) : currentCards).map((pokemon, index) => {
                    return (
                        <DraggableCard key={`${cardId}-${index}`} id={`${cardId}-${index}`} pokemon={pokemon}></DraggableCard>
                    )
                })
            }
        </GridContainer>
    )
});

export default CardsColumn;