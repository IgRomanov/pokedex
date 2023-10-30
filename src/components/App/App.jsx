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
            PageStore.setPage(PageStore.currentPage - 1);
            PokemonsStore.setPokemons([]);
            console.log(PageStore.currentPage)
            const { data } = await axios.get(previousUrl);
            data.results.forEach(async (pokemon, index) => {
                const currentPokemonId = Number(pokemon.url.split('/pokemon/')[1].replace('/', ''));
                const res = await axios.get(`${BASE_URL}pokemon/${currentPokemonId}`);
                PokemonsStore.setPokemons(
                    [...PokemonsStore.allPokemons, { name: res.data.name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: res.data.base_experience }]
                );
            })
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
            PageStore.setPage(PageStore.currentPage + 1);
            PokemonsStore.setPokemons([]);
            const { data } = await axios.get(nextUrl);
            data.results.forEach(async (pokemon, index) => {
                const currentPokemonId = Number(pokemon.url.split('/pokemon/')[1].replace('/', ''));
                const res = await axios.get(`${BASE_URL}pokemon/${currentPokemonId}`);
                PokemonsStore.setPokemons(
                    [...PokemonsStore.allPokemons, { name: res.data.name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: res.data.base_experience }]
                );
                console.log(PokemonsStore.addPokemon)
       
            })
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
        const dataToPush = [];
        const getData = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}pokemon?offset=${PageStore.currentOffset}&limit=${PageStore.currentLimit}`);
                data.results.forEach(async (pokemon, index) => {
                    const currentPokemonId = Number(pokemon.url.split('/pokemon/')[1].replace('/', ''));
                    const res = await axios.get(`${BASE_URL}pokemon/${currentPokemonId}`);
                    dataToPush.push({ name: res.data.name, types: res.data.types, img: res.data.sprites.front_default, weight: res.data.weight, height: res.data.height, attack: res.data.stats[1].base_stat, baseExperience: res.data.base_experience })
                    PokemonsStore.setPokemons(dataToPush)
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
    }, [PageStore.currentLimit]);

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
