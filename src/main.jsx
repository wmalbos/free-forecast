import React, {useContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from "./app";
import {ThemeProvider} from "./contexts/theme/provider";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
)
