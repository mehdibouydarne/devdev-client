import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormRegisterDegree = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [fees, setFees] = useState("");
    const [languages, setLanguages] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "duration") {
            setDuration(e.target.value);
        } else if (e.target.name === "fees") {
            setFees(e.target.value);
        } else if (e.target.name === "languages") {
            setLanguages(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataForm = {
            school: user.id,
            name: name,
            duration: duration,
            fees: fees,
            languages: languages,
        };

        if (user) {
            if (user.userType === "school" || user.isAdmin) {
                axios
                    .post(`${process.env.REACT_APP_HOST}/degree/add-post`, dataForm, {
                        headers: authHeader(),
                    })
                    .then((res) => {
                        if (res.data.message) {
                            return setMessage(res.data.message);
                        }
                        navigate("/profile");
                    });
            } else {
                setMessage("Vous n'êtes pas habilité à créer un diplôme");
            }
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
    {(user && (user.userType === "school" || user.isAdmin)) ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-add-post"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Nom du diplôme</label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            value={name}
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

                        <label htmlFor="fees">Frais de scolarité</label>
                        <input
                            required
                            type="number"
                            name="fees"
                            id="fees"
                            value={fees}
                            onChange={handleChange}
                        />

                        <label htmlFor="languages">Langages étudiés</label>
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

export default FormRegisterDegree;
