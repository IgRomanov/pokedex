import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PokemonsStore from '../../store/PokemonsStore';
import PageStore from '../../store/PageStore';
import { useId } from 'react';
import axios from 'axios';
import PaginationList from "../PaginationList/PaginationList";
import Grid from "../Grid/Grid";
import Search from '../Search/Search';
import AsidePopup from '../AsidePopup/AsidePopup';
import { observer } from 'mobx-react-lite';
import { useDebounce } from "../../hooks/useDebounce";
import { getAllData, getTypes, getDataWithParams, getType } from '../../utils/api';

const App = observer(() => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [limitValue, setLimitValue] = useState(PageStore.currentLimit);
    const [types, setTypes] = useState([]);
    const [namesByType, setNamesByType] = useState([]);
    const [allData, setAlldata] = useState([]);
    const [currentMode, setCurrentMode] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const searchData = useDebounce(searchValue, 1000);

    const paginationId = useId();

    const getData = async () => {
        try {
            const { data } = await getDataWithParams(PageStore.currentOffset, PageStore.currentLimit);
            PokemonsStore.setPokemons(data.results);
            if (data.next) {
                PageStore.setNextUrl(data.next);
            };
            if (data.previous) {
                PageStore.setPreviousUrl(data.previous);
            };
        } catch (e) {
            console.log(e);
        }
    };

    const getDataByType = async () => {
        try {
            const { data } = await getAllData();
            PokemonsStore.setPokemons(data.results);
            setAlldata(data.results);
        } catch (e) {
            console.log(e)
        }
    };

    const getAllTypes = async () => {
        try {
            const { data } = await getTypes();
            setTypes(data.results);
        } catch (e) {
            console.log(e);
        }
    };

    const getCurrentType = async (type) => {
        try {
            const { data } = await getType(type);
            let names = data.pokemon.map(pokemon => pokemon.pokemon.name);
            setNamesByType([...namesByType, ...names]);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
    };

    const handlePreviousClick = async () => {
        try {
            if (currentMode !== 'search') {
                const { data } = await axios.get(PageStore.previousUrl)
                PageStore.setPage(PageStore.currentPage - 1);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                PageStore.setNextUrl(data.next);
                if (data.previous) {
                    PageStore.setPreviousUrl(data.previous);
                };
            };
            PageStore.setPage(PageStore.currentPage - 1);
        } catch (e) {
            console.log(e);
        }
    };

    const handleNextClick = async () => {
        try {
            if (currentMode !== 'search') {
                const { data } = await axios.get(PageStore.nextUrl)
                PageStore.setPage(PageStore.currentPage + 1);
                PokemonsStore.setPokemons(data.results);
                PageStore.setPreviousUrl(data.previous);
                PageStore.setNextUrl(data.next);
                if (data.next) {
                    PageStore.setNextUrl(data.next);
                };
            };
            PageStore.setPage(PageStore.currentPage + 1);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (currentMode === 'list') {
            getData();
        } else if (currentMode === 'search') {
            getDataByType();
        }
    }, [currentMode]);

    useEffect(() => {
        if (PokemonsStore.selectedTypes.length > 0) {
            PokemonsStore.selectedTypes.forEach((type) => {
                getCurrentType(type);
            })
        } else {
            setNamesByType([]);
        }
    }, [PokemonsStore.selectedTypes])

    const currentCards = useMemo(() => {
        if (namesByType.length > 0) {
            return allData
                .filter(pokemon => namesByType.includes(pokemon.name))
                .filter(pokemon => pokemon.name.toLowerCase().includes(searchData.toLowerCase()));
        } 
        return allData.filter(pokemon => pokemon.name.toLowerCase().includes(searchData.toLowerCase()));
        
    }, [namesByType, searchData, allData])

    useEffect(() => {
        getAllTypes();
    }, []);

    useEffect(() => {
        if (namesByType === '' && searchData.length === 0) {
            setCurrentMode('list');
            PokemonsStore.setCurrentMode('list');
            PageStore.setPage(1);
        } else {
            setCurrentMode('search');
            PokemonsStore.setCurrentMode('search');
            PageStore.setPage(1);
        }
    }, [namesByType, searchData])

    useEffect(() => {
        navigate(`/${PageStore.currentPage}`);
    }, [PageStore.currentPage])

    return (
        <div className="App">
            <Routes>
                <Route path=":id" element={
                    <main>
                        <Search searchValue={searchValue} handleSearchChange={handleSearchChange} handleSubmitClick={handleSubmitClick} setLimitValue={setLimitValue} limitValue={limitValue} />
                        <Grid currentCards={currentCards} currentMode={currentMode} />
                        <PaginationList currentCards={currentCards} handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} paginationId={paginationId} />
                    </main>
                } />
            </Routes>
            <AsidePopup types={types} setNamesByType={setNamesByType} />
        </div>
    )
})
export default App;
