import React from 'react';
import './App.css';
import MapPresenter from "./presenters/MapPresenter/MapPresenter";
import DashboardView from './views/RoadMapView/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <DashboardView />
                        </Route>
                        <Route path="/mappresenter">
                            <MapPresenter />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );


}

export default App;
