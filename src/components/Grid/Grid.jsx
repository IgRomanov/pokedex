import { GridContainer, NotFoundContainer, NotFoundH2 } from "./styled"; 
import Card from "../Card";
import PokemonsStore from "../../store/PokemonsStore";
import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId } from "react";

const Grid = observer(({ currentCards, currentMode }) => {
    const cardId = useId()
    return (
        <>
            {
                PokemonsStore.allPokemons.length > 0 ?
                    <GridContainer>
                        {
                            (currentMode === 'search' && currentCards ? currentCards.slice(PageStore.currentOffset, PageStore.currentLimit * PageStore.currentPage) : PokemonsStore.allPokemons).map((pokemon, index) => {
                                return (
                                    <Card key={`${cardId}-${index}`} pokemon={pokemon}></Card>
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