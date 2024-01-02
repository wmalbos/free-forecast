import Navigation from "../../components/navigation";
import {Content, Root} from "./index.styled";
import {ThemeContext} from "../../contexts/theme/context";
import {useContext} from "react";

const LayoutPage = ({children}) => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Root>
            <Navigation/>
            <button onClick={toggleTheme}>Toggle theme</button>

            <Content>{children}</Content>
        </Root>
    );
}

export default LayoutPage;