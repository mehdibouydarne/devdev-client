import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditNew = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [title, setTitle] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/new/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                console.log(user);
                setTitle(res.data.title);
                setIntroduction(res.data.introduction);
                setContent(res.data.content);
                setAuthor(res.data.author);
                setImage(res.data.image.src);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "introduction") {
            setIntroduction(e.target.value);
        } else if (e.target.name === "content") {
            setContent(e.target.value);
        } else if (e.target.name === "author") {
            setAuthor(e.target.value);
        } else if (e.target.name === "image") {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("introduction", introduction);
        formData.append("content", content);
        formData.append("author", author);
        formData.append("image", image);

        if (user) {
            if (user.isAdmin) {
                axios
                    .put(
                        `${process.env.REACT_APP_HOST}/new/edit-post/${id}`,
                        formData,
                        {
                            headers: authHeader(),
                        }
                    )
                    .then((res) => {
                        if (res.data.message) {
                            return setMessage(res.data.message);
                        }
                        navigate("/admin");
                    });
            } else {
                setMessage("Vous n'êtes pas habilité à modifier cet article");
            }
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
            {user && user.isAdmin ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-edit"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="title">Titre</label>
                        <input
                            aria-label="titre"
                            required
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={handleChange}
                        />

                        <label htmlFor="introduction">Introduction</label>
                        <textarea
                            aria-label="introduction"
                            required
                            name="introduction"
                            id="introduction"
                            cols="30"
                            rows="8"
                            maxlength="400"
                            value={introduction}
                            onChange={handleChange}
                        />

                        <label htmlFor="content">Développement</label>
                        <textarea
                            aria-label="développement"
                            required
                            name="content"
                            id="content"
                            cols="30"
                            rows="8"
                            maxlength="400"
                            value={content}
                            onChange={handleChange}
                        />

                        <label htmlFor="author">Nom de l'auteur</label>
                        <input
                            aria-label="nom de l'auteur"
                            required
                            type="text"
                            name="author"
                            id="author"
                            value={author}
                            onChange={handleChange}
                        />

                        <label htmlhtmlFor="image">Image</label>
                        <input
                            aria-label="image"
                            required
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />

                        <input type="submit" value="Ajouter" />
                    </form>
                </>
            ) : (
                <h1 className="authenticate-message">
                    Veuillez vous authentifier
                </h1>
            )}
        </>
    );
};

export default FormEditNew;
