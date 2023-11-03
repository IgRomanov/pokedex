import styled from "styled-components";
import Card from "../Card/Card";
import PokemonsStore from "../../store/PokemonsStore";
import PageStore from "../../store/PageStore";
import { observer } from "mobx-react-lite";
import { useId } from "react";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(100px, max-content);
    gap: 10px;
    padding: 30px 30px;
    background-color: black;
    min-height: 100vh;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

const NotFoundContainer = styled.div`
    gap: none;
    display: block;
    padding: 30px 30px;
    background-color: black;
    min-height: 100vh;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
;`

const NotFoundH2 = styled.h2`
    color: white;
    text-align: center;
    margin-top: 30%;
    font-size: 50px;
`;

const Grid = observer(({ currentCards, currentMode }) => {
    const cardId = useId()
    return (
        <>
            {
                (currentMode === 'list' ? PokemonsStore.allPokemons : currentCards).length > 0 ?
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