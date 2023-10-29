import styled from "styled-components";
import PokemonsStore from "../../store/PokemonsStore";
import PageStore from "../../store/PageStore";
import { useEffect, useState, useId } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/const";
import { observer } from "mobx-react-lite";
import { useSearchParams, useLocation, Routes, Route, useNavigate, useParams  } from "react-router-dom";
import PaginationList from "../PaginationList/PaginationList";
import Grid from "../Grid/Grid";

const MainContent = observer(() => {
    const navigate = useNavigate();

    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [currentNumbers, setCurrentNumbers] = useState([]);
    const cardId = useId();
    const paginationId = useId();

    const handlePreviousClick = async () => {
        try {
            const { data } = await axios.get(previousUrl);
            PokemonsStore.setPokemons(data.results);
            PageStore.setPage(PageStore.currentPage-1);
            setPreviousUrl(data.previous);
            setNextUrl(data.next);
            navigate(`/${PageStore.currentPage}`);
            if (data.previous) {
                setPreviousUrl(data.previous)
            };
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        try {
            const { data } = await axios.get(nextUrl);
            PokemonsStore.setPokemons(data.results);
            PageStore.setPage(PageStore.currentPage+1);
            setPreviousUrl(data.previous);
            setNextUrl(data.next);
            navigate(`/${PageStore.currentPage}`);
            if (data.next) {
                setNextUrl(data.next);
            };
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const currentId = Number(window.location.pathname.slice(1));
        PageStore.setPage(currentId);
        axios.get(`${BASE_URL}pokemon?offset=${PageStore.currentOffset}`)
        .then(res => res.data)
        .then((data) => {
            PokemonsStore.setPokemons(data.results);
            // setCurrentNumbers(Math.ceil(data.count / limit));
            if (data.next) {
                setNextUrl(data.next);
            };
            if (data.previous) {
                setPreviousUrl(data.previous)
            };
        })
        .catch((e) => {
            console.log(e);
        })
    }, [])

    return (
        <>  <Routes>
                <Route path=":id" element={
                        <>
                        <Grid cardId={cardId} allPokemons={PokemonsStore.allPokemons} limit={PageStore.currentLimit}/>
                        <PaginationList disabledNext={!nextUrl} disabledPrevious={!previousUrl} handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} paginationId={paginationId} currentNumbers={[1, 2]}/>
                        </>
                    }/>
            </Routes>
        </>
    )
});

export default MainContent;