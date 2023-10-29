import styled from "styled-components";
import Card from "../Card/Card";
import { useEffect } from "react";

import { useParams, useLocation } from "react-router-dom";
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 10px;
    padding: 30px 30px;
    background-color: black;
`;

const Grid = ({cardId, allPokemons}) => {
    return (
        <GridContainer>
            {
                allPokemons.map((pokemon, index) => (
                    <Card key={`${cardId}-${index}`} name={pokemon.name} url={pokemon.url}></Card>
                )
                )
            }
        </GridContainer>
    )
};

export default Grid;