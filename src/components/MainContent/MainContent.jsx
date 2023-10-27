import styled from "styled-components";
import PokemonsStore from "../../store/PokemonsStore";
import { useEffect, useState, useId } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { observer } from "mobx-react-lite";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 10px;
    padding: 30px 30px;
    background-color: black;
`;

const PaginationList = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    justify-content: center;
    gap: 10px;
`;

const MainContent = observer(() => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentRecords, setCurrentRecords] = useState(20);
    const [pages, setPages] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const cardId = useId();
    const paginationId = useId();

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search);
        const offset = searchParams.get('offset');
        const limit = searchParams.get('limit');
        axios.get(`${BASE_URL}pokemon?offset=${offset}&limit=${limit}'`)
            .then((res) => res.data)
            .then((data) => {
                if (!offset || !limit) {
                    setCurrentPage(1);
                } else {
                    setCurrentPage(offset / limit);
                }
                const numberOfPages = Math.ceil(data.count / currentRecords);
                PokemonsStore.setPokemons(data.results);
                setPages([...Array(numberOfPages + 1).keys()].slice(1));
                if (data.previous) {
                    setPreviousUrl(data.previous)
                };
                setNextUrl(data.next);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    const handlePreviousClick = async () => {
        try {
            const { data } = await axios.get(previousUrl);
            console.log(data)
            PokemonsStore.setPokemons(data.results);
            setPreviousUrl(data.previous);
            setNextUrl(data.next);
            setCurrentPage(currentPage - 1);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        try {
            const { data } = await axios.get(nextUrl);
            console.log(data)
            PokemonsStore.setPokemons(data.results);
            setPreviousUrl(data.previous);
            setNextUrl(data.next);
            setCurrentPage(currentPage + 1);
        } catch (e) {
            console.log(e);
        }
    };

    // useEffect(() => {
    //     const indexOfLastRecord = currentPage * currentRecords;
    //     const indexOfFirstRecord = indexOfLastRecord - currentRecords;
    // }, [currentPage, currentRecords])

    return (
        <>
            <Grid>
                {
                    PokemonsStore.allPokemons.map((pokemon, index) => (
                        <Card key={`${cardId}-${index}`} name={pokemon.name} url={pokemon.url}></Card>
                    )
                    )
                }
            </Grid>
            <PaginationList>
                <li>
                    <Link onClick={handlePreviousClick} to={`?offset=${currentPage * currentRecords}&limit=${currentRecords}`}>dfgfdgd</Link>
                </li>
                {
                    pages.length > 5 ?
                        pages.splice(0, 5).map((elem, index) => (
                            <li key={`${paginationId}-${index}`}>{elem}</li>
                        ))
                        :
                        pages.map(() => (
                            <li></li>
                        ))
                }
                <li>
                    <Link onClick={handleNextClick} to={`?offset=${currentPage * currentRecords}&limit=${currentRecords}`}>dfgfdg</Link>
                </li>
            </PaginationList>
        </>
    )
});

export default MainContent;