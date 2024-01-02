import {NavLink} from "react-router-dom";
import {Root} from "./index.styled";
const Navigation = () => {

    return (
        <Root>
        <nav>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/projects/create">Create Project</NavLink>
                </li>
                <li>
                    <NavLink to="/categories">Catégories</NavLink>
                </li>
            </ul>
        </nav>
        </Root>
    )
}

export default Navigation