import { GridContainer, NotFoundContainer, NotFoundH2 } from "./styled";
import Card from "../Card";
import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId, useState } from "react";

const Grid = observer(({ currentCards, namesByType, searchData }) => {
    const [activePopupId, setActivePopupId] = useState(false);
    const cardId = useId()

    const handleCardClick = (id) => {
        if (activePopupId === id) {
            setActivePopupId(false);
        } else {
            setActivePopupId(id);
        }
    };

    return (
        <>
            {
                currentCards && currentCards.length > 0 ?
                    <GridContainer $color="black">
                        {
                            (namesByType.length > 0 || searchData !== '' || currentCards.length > PageStore.currentLimit ? currentCards.slice(PageStore.currentOffset, PageStore.currentLimit * PageStore.currentPage) : currentCards).map((pokemon, index) => {
                                return (
                                    <Card draggable id={`${cardId}-${index}`} key={`${cardId}-${index}`} pokemon={pokemon} isActive={activePopupId === `${cardId}-${index}`} handleCardClick={handleCardClick}></Card>
                                )

                            })
                        }
                    </GridContainer>
                    :
                    <NotFoundContainer><NotFoundH2>Not found</NotFoundH2></NotFoundContainer>
            }
        </>
    )
});

export default Grid;