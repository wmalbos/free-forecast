import {styled} from "styled-components";
import {NAVIGATION_WIDTH} from "../../layouts/page/index.styled";

export const Root = styled.div`
    width: ${NAVIGATION_WIDTH}px;
    height: 100vh;
    background: ${props => props.theme.backgrounds.navigation};
`