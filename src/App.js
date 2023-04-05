import './App.css';
import React from "react"
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./Routes/users-routes";



function App() {
    const routes = useRoutes(false)
    return (
        <BrowserRouter>
            <div className="container">
                <div className="App">
                    <header className="App-header">
                        {routes}
                    </header>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;