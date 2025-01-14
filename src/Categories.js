import { useEffect, useState } from "react";



const Categories = () => {



    const [formData, setFormData] = useState({ nom: "", description: '' });
    const [categories, setCategories] = useState([]);
    const [updateId, setUpdateId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            if (updateId) {
                fetch(`http://localhost:5000/api/categories/${updateId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }).then(() => {
                    setFormData({ nom: "", description: '' });
                    setUpdateId(null);
                    getCategories();
                })
            } else {
                fetch('http://localhost:5000/api/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }).then(() => {

                    setFormData({ nom: "", description: '' });
                    getCategories();
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getCategories = () => {
        fetch('http://localhost:5000/api/categories')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCategories(data);
            })
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/categories/${id}`, {
            method: 'DELETE'
        }).then(() => {
            getCategories();
        })
    }

    const handleUpdate = (category) => {
        setFormData({ nom: category.nom, description: category.description });
        setUpdateId(category.id);
    }


    return (
        <div>
            <h2>Categories</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="nom" name="nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">{updateId ? 'Modifier' : 'Creer'}</button>

            </form>

            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.nom} {category.description}
                        <button type="button" onClick={() => handleUpdate(category)}>Modifier</button>
                        <button type="button" onClick={() => handleDelete(category.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;

/*
let tab = [1, 2, 3, 4, 5];
for (let i = 0; i < tab.length; i++) {
    console.log(tab[i]);
}
*/