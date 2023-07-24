import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditDegree = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [degree, setDegree] = useState([]);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [fees, setFees] = useState("");
    const [languages, setLanguages] = useState("");
    const [school, setSchool] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/degree/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                setDegree(res.data.informations);
                setName(res.data.informations.name);
                setDuration(res.data.informations.duration);
                setFees(res.data.informations.fees);
                setLanguages(res.data.informations.languages);
                setSchool(res.data.school);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, []);

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
            name: name,
            duration: duration,
            fees: fees,
            languages: languages,
        };

        if (user) {
            if (user.id === school || user.isAdmin) {
                axios
                    .put(
                        `${process.env.REACT_APP_HOST}/degree/edit-post/${id}`,
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
                setMessage("Vous n'êtes pas habilité à modifier ce diplôme");
            }
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
            {(user && user.id === school) || user.isAdmin ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-edit"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Nom du diplôme</label>
                        <input
                            aria-label="nom"
                            required
                            type="text"
                            name="name"
                            id="name"
                            value={name}
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

                        <label htmlFor="fees">Frais de scolarité</label>
                        <input
                            aria-label="frais de scolarité"
                            required
                            type="number"
                            name="fees"
                            id="fees"
                            value={fees}
                            onChange={handleChange}
                        />

                        <label htmlFor="languages">Langages étudiés</label>
                        <textarea
                            aria-label="languages étudiés"
                            required
                            name="languages"
                            id="languages"
                            cols="30"
                            rows="8"
                            maxlength="400"
                            value={languages}
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
