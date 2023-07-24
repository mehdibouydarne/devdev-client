import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormRegisterJob = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [name, setName] = useState("");
    const [presentation, setPresentation] = useState("");
    const [duration, setDuration] = useState("");
    const [languages, setLanguages] = useState("");
    const [link, setLink] = useState("");
    const [message, setMessage] = useState("");

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

        let dataForm;
        if (!user.isAdmin) {
            dataForm = {
                name: name,
                presentation: presentation,
                duration: duration,
                languages: languages,
                link: link,
                recruiter: user.id,
                src: user.logo.src,
                alt: user.logo.alt,
                rname: user.informations.name,
                rcity: user.address.city,
            };
        } else {
            dataForm = {
                name: name,
                presentation: presentation,
                duration: duration,
                languages: languages,
                link: link,
                recruiter: user.id,
                src: "img-default.png",
                alt: "default image",
                rname: "",
                rcity: "",
            };
        }

        if (user) {
            if (user.userType === "recruiter" || user.isAdmin) {
                axios
                    .post(
                        `${process.env.REACT_APP_HOST}/job/add-job`,
                        dataForm,
                        {
                            headers: authHeader(),
                        }
                    )
                    .then((res) => {
                        if (res.data.message) {
                            return setMessage(res.data.message);
                        }
                        navigate("/profile");
                    });
            } else {
                setMessage("Vous n'êtes pas habilité à créer un poste");
            }
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
            {(user && user.userType === "recruiter") || user.isAdmin ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-add-post"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Nom du poste</label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                        />

                        <label htmlFor="presentation">
                            Description du poste
                        </label>
                        <textarea
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
                            required
                            type="number"
                            name="duration"
                            id="duration"
                            value={duration}
                            onChange={handleChange}
                        />

                        <label htmlFor="languages">Langages demandés</label>
                        <textarea
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
                            required
                            type="text"
                            name="link"
                            id="link"
                            value={link}
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

export default FormRegisterJob;
