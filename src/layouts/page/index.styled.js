import {styled} from "styled-components";


export const NAVIGATION_WIDTH = 250;

export const Root = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

export const Content = styled.div`
    width: calc(100% - ${NAVIGATION_WIDTH}px);
`