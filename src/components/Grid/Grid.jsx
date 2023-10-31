import styled from "styled-components";
import Card from "../Card/Card";
import PokemonsStore from "../../store/PokemonsStore";
import PageStore from "../../store/PageStore";
import { useEffect, useState } from "react";

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

const Grid = ({ cardId, allPokemons }) => {
    const [currentData, setCurrentData] = useState()
    let firstIndex = PageStore.currentOffset
    let lastIndex = PageStore.currentLimit*PageStore.currentPage;
    useEffect(() => {
        setCurrentData(PokemonsStore.allPokemons.splice)
    }, [])
    return (
        <>
         {
            PokemonsStore.allPokemons ?
                <GridContainer>
                    {
                            PokemonsStore.allPokemons.map((pokemon, index) => (
                            <Card key={`${cardId}-${index}`} pokemon={pokemon}></Card>
                        ))
                    }
                </GridContainer>
            :
                <NotFoundContainer><NotFoundH2>Not found</NotFoundH2></NotFoundContainer>
         }
        </>
    )   
};

export default Grid;