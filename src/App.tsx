import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import Navbar from './coponents/Navbar/Navbar';
import Routes from "./Routes";


function App() {
    return (
        <div className="App">
            <HashRouter>
                <Navbar/>
                <Routes/>
            </HashRouter>
        </div>
    );
}

export default App;
