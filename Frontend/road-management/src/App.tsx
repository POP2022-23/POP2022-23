import React from 'react';
import './App.css';
import MapPresenter from "./presenters/MapPresenter/MapPresenter";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MapPresenter></MapPresenter>
            </header>
        </div>
    );
}

export default App;
