import { useState } from "react";
import axios from "axios";

const FormRegisterUsers = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "firstname") {
            setFirstname(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "confirmed_password") {
            setConfirmedPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataForm = {
            name: name,
            firstname: firstname,
            email: email,
            password: password,
            userType: "user",
        };
        if (password === confirmedPassword) {
            axios.post(`${process.env.REACT_APP_HOST}/user/register`, dataForm).then((res) => {
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
        } else {
            setMessage("Veuillez confirmer votre mot de passe");
        }
    };

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <form
                method="post"
                className="form-register"
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

                <label htmlFor="password">Mot de passe</label>
                <input
                    aria-label="mot de passe"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                />

                <label htmlFor="confirmed_password">
                    Confirmation du mot de passe
                </label>
                <input
                    aria-label="mot de passe"
                    type="password"
                    name="confirmed_password"
                    id="confirmed_password"
                    value={confirmedPassword}
                    onChange={handleChange}
                />

                <input type="submit" value="S'enregistrer" />
            </form>
        </>
    );
};

export default FormRegisterUsers;
