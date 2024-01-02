import { useState } from "react";
import { ThemeContext } from "./context";
import {darkTheme, lightTheme} from "./theme.styled"; // assuming your context is in ThemeContext file
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (

        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledComponentsThemeProvider theme={theme}>
            {children}
            </StyledComponentsThemeProvider>
        </ThemeContext.Provider>
    );
};