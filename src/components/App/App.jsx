import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import PokemonsStore from '../../store/PokemonsStore';
import PageStore from '../../store/PageStore';
import { useId } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';
import PaginationList from "../PaginationList/PaginationList";
import Grid from "../Grid/Grid";
import Search from '../Search/Search';
import AsidePopup from '../AsidePopup/AsidePopup';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
    const navigate = useNavigate();

    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [limitValue, setLimitValue] = useState(PageStore.currentLimit);
    const [types, setTypes] = useState([]);
    const cardId = useId();
    const paginationId = useId();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
    };

    const handlePreviousClick = async () => {
        try {
            PokemonsStore.clearDataOfPokemons();
            const { data } = await axios.get(previousUrl);
            data.results.forEach(async (pokemon, index) => {
                const res = await axios.get(`${BASE_URL}pokemon/${index + 1}`);
                PokemonsStore.setPokemons(
                    [...PokemonsStore.allPokemons, { name: data.results[index].name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: data.base_experience }]
                );
            })
            PageStore.setPage(PageStore.currentPage - 1);
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
            PokemonsStore.clearDataOfPokemons();
            const { data } = await axios.get(nextUrl);
            data.results.forEach(async (pokemon, index) => {
                const res = await axios.get(`${BASE_URL}pokemon/${index + 1}`);
                PokemonsStore.setPokemons(
                    [...PokemonsStore.allPokemons, { name: data.results[index].name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: data.base_experience }]
                );
            })
            PageStore.setPage(PageStore.currentPage + 1);
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
        const getData = async () => {
            try {
                PokemonsStore.clearDataOfPokemons();
                console.log('fgf')
                const { data } = await axios.get(`${BASE_URL}pokemon?offset=${PageStore.currentOffset}&limit=${PageStore.currentLimit}`);
                data.results.forEach(async (pokemon, index) => {
                    const res = await axios.get(`${BASE_URL}pokemon/${index + 1}`);
                    PokemonsStore.setPokemons(
                        [...PokemonsStore.allPokemons, { name: data.results[index].name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: res.data.base_experience }]
                    );
                })
                if (data.next) {
                    setNextUrl(data.next);
                };
                if (data.previous) {
                    setPreviousUrl(data.previous);
                };
                
            }
            catch (e) {
                console.log(e);
            }
        }
        getData();
    }, [limitValue]);

    const filteredPokemons = useMemo(() => {
        return PokemonsStore.allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [searchValue]);

    useEffect(() => {
        axios.get(`${BASE_URL}type`)
            .then(res => res.data)
            .then((data) => {
                setTypes(data.results)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path=":id" element={
                    <main>
                        <Search handleSearchChange={handleSearchChange} handleSubmitClick={handleSubmitClick} setLimitValue={setLimitValue} limitValue={limitValue} />
                        <Grid cardId={cardId} allPokemons={searchValue.length > 0 ? filteredPokemons : PokemonsStore.allPokemons} limit={PageStore.currentLimit} />
                        <PaginationList disabledNext={!nextUrl} disabledPrevious={!previousUrl} handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} paginationId={paginationId} currentNumbers={[1, 2]} />
                    </main>
                } />
            </Routes>
            <AsidePopup types={types} />
        </div>
    )
})
export default App;
