import { useState } from "react";
import axios from "axios";

const FormRegisterStudents = () => {
    const [salutation, setSalutation] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (
            e.target.name === "man" ||
            e.target.name === "woman" ||
            e.target.name === "nmow"
        ) {
            setSalutation(e.target.value);
        } else if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "firstname") {
            setFirstname(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "zip") {
            setZip(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "confirmed_password") {
            setConfirmedPassword(e.target.value);
        } else if (e.target.name === "newsletter") {
            setNewsletter(e.target.checked);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let dataForm = {
            salutation: salutation,
            name: name,
            firstname: firstname,
            email: email,
            phone: phone,
            zip: zip,
            password: password,
            newsletter: newsletter,
            userType: "student",
        };

        if (password === confirmedPassword) {
            axios
                .post(
                    `${process.env.REACT_APP_HOST}/student/register`,
                    dataForm
                )
                .then((res) => {
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
                <label htmlFor="salutation">Civilité</label>
                <article className="form-register-salutations">
                    <div>
                        <label htmlFor="man">Homme</label>
                        <input
                            aria-label="homme"
                            type="radio"
                            name="man"
                            id="man"
                            value="homme"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="woman">Femme</label>
                        <input
                            aria-label="femme"
                            type="radio"
                            name="woman"
                            id="woman"
                            value="femme"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="nmow">Autre</label>
                        <input
                            aria-label="autre"
                            type="radio"
                            name="nmow"
                            id="nmow"
                            value="autre"
                            onChange={handleChange}
                        />
                    </div>
                </article>

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

                <label htmlFor="phone">Numéro de téléphone</label>
                <input
                    aria-label="telephone"
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={handleChange}
                />

                <label htmlFor="postcode">Code postal</label>
                <input
                    aria-label="code postal"
                    type="number"
                    name="zip"
                    id="zip"
                    value={zip}
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

                <article className="form-register-newsletter">
                    <input
                        aria-label="newsletter"
                        type="checkbox"
                        name="newsletter"
                        id="newsletter"
                        value={!newsletter}
                        onChange={handleChange}
                    />
                    <label htmlFor="newsletter">
                        S'inscrire à la newsletter
                    </label>
                </article>

                <input type="submit" value="S'enregistrer" />
            </form>
        </>
    );
};

export default FormRegisterStudents;
