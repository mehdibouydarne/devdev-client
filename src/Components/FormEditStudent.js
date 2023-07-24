import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditStudent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [student, setStudent] = useState("");
    const [salutation, setSalutation] = useState("");
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            axios
                .get(`${process.env.REACT_APP_HOST}/student/${user.id}`, {
                    headers: authHeader(),
                })
                .then((res) => {
                    setStudent(res.data);
                    setSalutation(res.data.informations.salutation);
                    setName(res.data.informations.name);
                    setFirstname(res.data.informations.firstname);
                    setEmail(res.data.contacts.email);
                    setPhone(res.data.contacts.phone);
                    setZip(res.data.address.zip);
                    setNewsletter(res.data.newsletter);
                    if (res.data.message) {
                        return setMessage(res.data.message);
                    }
                });
        } else {
            setMessage("Veuillez vous authentifier");
        }
    }, []);

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
            newsletter: newsletter,
        };

        if (user) {
            axios
                .put(`${process.env.REACT_APP_HOST}/student/edit-student/${user.id}`, dataForm, {
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

                        <article className="form-edit-checkbox">
                            <input
                                aria-label="newsletter"
                                type="checkbox"
                                name="newsletter"
                                id="newsletter"
                                value={!newsletter}
                                checked={newsletter}
                                onChange={handleChange}
                            />
                            <label htmlFor="newsletter">
                                {newsletter
                                    ? "Inscrit à la newsletter"
                                    : "Désinscrit de la newsletter"}
                            </label>
                        </article>

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

export default FormEditStudent;
