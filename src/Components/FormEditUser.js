import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditUsers = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [user_, setUser_] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");     n  `z`
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            axios
                .get(`${process.env.REACT_APP_HOST}/user/${user.id}`, { headers: authHeader() })
                .then((res) => {
                    setUser_(res.data);
                    setName(res.data.informations.name);
                    setFirstname(res.data.informations.firstname);
                    setEmail(res.data.contact.email);
                    if (res.data.message) {
                        return setMessage(res.data.message);
                    }
                });
        } else {
            setMessage("Veuillez vous authentifier");
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "firstname") {
            setFirstname(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataForm = {
            name: name,
            firstname: firstname,
            email: email,
        };

        if (user) {
            axios
                .put(`${process.env.REACT_APP_HOST}/user/edit-user/${user.id}`, dataForm, {
                    headers: authHeader(),
                })
                .then((res) => {
                    if (res.data.message) {
                        return setMessage(res.data.message);
                    }
                    navigate("/profile");
                });
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
            {user ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-edit"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="name">Nom</label>
                        <input
                            aria-label="nom"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                        />

                        <label htmlFor="firstname">Prénom</label>
                        <input
                            aria-label="prenom"
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={firstname}
                            onChange={handleChange}
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            aria-label="email"
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={email}
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

export default FormEditUsers;
