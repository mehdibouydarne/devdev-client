import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormRegisterNew = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [title, setTitle] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

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
                    .post(`${process.env.REACT_APP_HOST}/new/add-new`, formData, {
                        headers: authHeader(),
                    })
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
                        className="form-add-post"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                    >
                        <label htmlFor="title">Titre</label>
                        <input
                            required
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={handleChange}
                        />

                        <label htmlFor="introduction">Introduction</label>
                        <textarea
                            required
                            name="introduction"
                            id="introduction"
                            cols="30"
                            rows="8"
                            maxLength="400"
                            value={introduction}
                            onChange={handleChange}
                        />

                        <label htmlFor="content">Développement</label>
                        <textarea
                            required
                            name="content"
                            id="content"
                            cols="30"
                            rows="8"
                            maxLength="400"
                            value={content}
                            onChange={handleChange}
                        />

                        <label htmlFor="author">Nom de l'auteur</label>
                        <input
                            required
                            type="text"
                            name="author"
                            id="author"
                            value={author}
                            onChange={handleChange}
                        />

                        <label htmlFor="image">Image</label>
                        <input
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

export default FormRegisterNew;
