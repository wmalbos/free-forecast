import {createGlobalStyle} from 'styled-components';
import Router from "./router";
import {useContext} from "react";
import {ThemeProvider} from "./contexts/theme/provider";
import {ThemeContext} from "./contexts/theme/context";

const App = () => {

    const { theme } = useContext(ThemeContext);

    const GlobalStyle = createGlobalStyle`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        ul {
            list-style: none;
        }

        button {
            cursor: pointer;
            outline: none;
            box-shadow: none;
        }

        input, textarea {
            outline: none;
            box-shadow: none;
        }

        html, body {
            margin: 0;
            padding: 0;
            background: ${props => props.theme.backgrounds.body};
        }
    `

    return (
        <>
            <GlobalStyle theme={theme}/>
            <Router/>
        </>
    )
}

export default App;