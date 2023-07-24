import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditDegree = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [job, setJob] = useState([]);
    const [name, setName] = useState("");
    const [presentation, setPresentation] = useState("");
    const [duration, setDuration] = useState("");
    const [languages, setLanguages] = useState("");
    const [link, setLink] = useState("");
    const [recruiter, setRecruiter] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/job/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                setJob(res.data.informations);
                setName(res.data.informations.name);
                setPresentation(res.data.informations.presentation);
                setDuration(res.data.informations.duration);
                setLanguages(res.data.informations.languages);
                setLink(res.data.contacts.link);
                setRecruiter(res.data.recruiter);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "presentation") {
            setPresentation(e.target.value);
        } else if (e.target.name === "duration") {
            setDuration(e.target.value);
        } else if (e.target.name === "languages") {
            setLanguages(e.target.value);
        } else if (e.target.name === "link") {
            setLink(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataForm = {
            name: name,
            presentation: presentation,
            duration: duration,
            languages: languages,
            link: link,
        };

        if (user) {
            if (user.id === recruiter || user.isAdmin) {
                axios
                    .put(
                        `${process.env.REACT_APP_HOST}/job/edit-post/${id}`,
                        dataForm,
                        {
                            headers: authHeader(),
                        }
                    )
                    .then((res) => {
                        if (res.data.message) {
                            return setMessage(res.data.message);
                        }
                        if (user.userType === "user") {
                            return navigate("/admin");
                        } else {
                            navigate("/profile");
                        }
                    });
            } else {
                setMessage("Vous n'êtes pas habilité à modifier ce poste");
            }
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
            {(user && user.id === recruiter) || user.isAdmin ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-edit"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Nom du poste</label>
                        <input
                            aria-label="nom du poste"
                            required
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                        />

                        <label htmlFor="presentation">Description du poste</label>
                        <textarea
                            aria-label="présentation"
                            required
                            name="presentation"
                            id="presentation"
                            cols="30"
                            rows="8"
                            maxlength="400"
                            value={presentation}
                            onChange={handleChange}
                        />

                        <label htmlFor="duration">Durée</label>
                        <input
                            aria-label="durée"
                            required
                            type="text"
                            name="duration"
                            id="duration"
                            value={duration}
                            onChange={handleChange}
                        />

                        <label htmlFor="languages">Langages demandés</label>
                        <textarea
                            aria-label="langages"
                            required
                            name="languages"
                            id="languages"
                            cols="30"
                            rows="8"
                            maxlength="400"
                            value={languages}
                            onChange={handleChange}
                        />

                        <label htmlFor="link">Lien vers l'offre d'emploi</label>
                        <input
                            aria-label="lien"
                            required
                            type="text"
                            name="link"
                            id="link"
                            value={link}
                            onChange={handleChange}
                        />

                        <input type="submit" value="Modifier" />
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

export default FormEditDegree;
