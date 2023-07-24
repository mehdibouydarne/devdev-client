import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [typeUser, setTypeUser] = useState("no_type_user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "type_user") {
            setTypeUser(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeUser === "no_type_user") {
            return setMessage("Veuillez sélectionner votre catégorie");
        }

        let dataForm = {
            email: email,
            password: password,
        };

        axios.post(`${process.env.REACT_APP_HOST}/${typeUser}/login`, dataForm).then((res) => {
            if (res.data.message) {
                return setMessage(res.data.message);
            }
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.href = "/";
                return res.data;
            }
        });
    };

    return (
        <main className="login-no-scroll">
            <section className="login">
                <img
                    src="./assets/img/picto-sun.jpg"
                    alt="sun"
                    className="picto-sun"
                />
                {message && <span className="error-message">{message}</span>}
                <form action="" className="form-login" onSubmit={handleSubmit}>
                    <label htmlFor="type_user">Vous êtes :</label>
                    <select
                        name="type_user"
                        id="type_user"
                        value={typeUser}
                        onChange={handleChange}
                    >
                        <option value="no_type_user">Sélectionner</option>
                        <option value="student">Un(e) étudiant(e)</option>
                        <option value="school">Une école</option>
                        <option value="recruiter">Un(e) recruteur•euse</option>
                        <option value="user">Autre</option>
                    </select>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={handleChange}
                    />
                    <input type="submit" value="Se connecter" />
                </form>
                <p>Ravis de vous revoir !</p>
            </section>
        </main>
    );
};

export default Login;
