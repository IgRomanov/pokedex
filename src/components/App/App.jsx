import './App.css';
import { Main } from '../Main';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Main></Main>
            </div>
        </BrowserRouter>
    )
}

export default App;
