import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import ProjectForm from "../pages/project/form";
import CategoryList from "../pages/category/list";
import CategoryForm from "../pages/category/form";

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/projects/create" element={<ProjectForm/>}/>
            <Route path="/categories" element={<CategoryList/>}/>
            <Route path="/categories/create" element={<CategoryForm/>}/>
            <Route path="/categories/edit/:id" element={<CategoryForm />}/>
        </Routes>
    </BrowserRouter>
}

export default Router;
