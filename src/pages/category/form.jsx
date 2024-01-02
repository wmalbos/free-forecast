import LayoutPage from "../../layouts/page";
import {useForm} from "react-hook-form";
import db from "../../services/database.service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const CategoryForm = () => {

    const {id} = useParams();

    const [items, setItems] = useState([]);
    const [category, setCategory] = useState()

    const [parent, setParent] = useState();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) => {
        const values = {
            title : data.title,
            parent: parent
        }
        db.insertValue(values, (value) => {
            console.log(value)
        })
    }

    const handleRemove = (event) => {
        event.preventDefault();

        db.removeValue(id, () => {

        })
    }

    useEffect(() => {
        db.getAllValues((values) => {
            setItems(values);
        })

        if (id) {
            console.log('edit : ' + id)
            db.getOneValue(id, (value) => {
                setCategory(value)

                reset({
                    title: value.title,
                    parent: value.parent,
                })

                setParent(value.parent)
            })
        }

    }, []);

    return (
        <LayoutPage>
            <h1>Category Form</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("title", {required: true})} />

                <select onChange={(e) => setParent({
                    id: e.target.value,
                    title: e.target.selectedOptions[0].innerText
                })} value={parent?.id || ''}>
                    <option value={''} data-title={''}>-- Aucune catégorie --</option>
                    {items.map((item, index) => (
                        <option key={index} value={item._id} data-title={item.title}>
                            {item.title} {item.parent?.id&& <span>{item.parent.title}</span>}
                        </option>
                    ))}
                </select>
                {errors.title && <span>This field is required</span>}

                <input type="submit"/>
                {id && <button onClick={handleRemove}>Supprimer</button>}
            </form>
        </LayoutPage>
    )
}

export default CategoryForm