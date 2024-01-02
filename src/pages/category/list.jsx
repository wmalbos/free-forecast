import {NavLink} from "react-router-dom";
import LayoutPage from "../../layouts/page";
import db from "../../services/database.service";
import {useEffect, useState} from "react";

const CategoryList = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        db.getAllValues((values) => {
            setItems(values);
            console.log(values)
        })

    }, []);

    return (
        <LayoutPage>
            <NavLink to={'/categories/create'}>Nouvelle catégorie</NavLink>
            <h1>Categories List</h1>

            {items.map((item, index) => (<>
                {!item.parent && (<>
                    <div key={index}>
                        {item.title}
                    </div>
                    <div>
                        {items.map((child, newIndex) => (<div>
                                {child.parent?.id === item._id && (
                                    <NavLink to={`/categories/edit/${child._id}`} key={newIndex}>-- {child.title}</NavLink>
                                )}
                            </div>)
                        )}
                    </div>
                </>)}
            </>))}
        </LayoutPage>
    )
}

export default CategoryList