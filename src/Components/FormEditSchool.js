import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditSchool = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [school, setSchool] = useState("");
    const [name, setName] = useState(""); // tout mettre dans un reducer
    const [yearofcreation, setYearofcreation] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            axios
                .get(`${process.env.REACT_APP_HOST}/school/${user.id}`, {
                    headers: authHeader(),
                })
                .then((res) => {
                    setSchool(res.data);
                    setName(res.data.informations.name);
                    setYearofcreation(res.data.informations.yearofcreation);
                    setDescription(res.data.informations.description);
                    setLogo(res.data.logo.src);
                    setEmail(res.data.contacts.email);
                    setPhone(res.data.contacts.phone);
                    setStreet(res.data.address.street);
                    setCity(res.data.address.city);
                    setZip(res.data.address.zip);
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
        } else if (e.target.name === "yearofcreation") {
            setYearofcreation(e.target.value);
        } else if (e.target.name === "description") {
            setDescription(e.target.value);
        } else if (e.target.name === "logo") {
            setLogo(e.target.files[0]);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "street") {
            setStreet(e.target.value);
        } else if (e.target.name === "city") {
            setCity(e.target.value);
        } else if (e.target.name === "zip") {
            setZip(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("yearofcreation", yearofcreation);
        formData.append("description", description);
        formData.append("logo", logo);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("street", street);
        formData.append("city", city);
        formData.append("zip", zip);

        axios
            .put(
                `${process.env.REACT_APP_HOST}/school/edit-school/${user.id}`,
                formData,
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
                        <label htmlFor="name">Nom de l'école</label>
                        <input
                            aria-label="nom"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleChange}
                        />

                        <label htmlFor="yearofcreation">
                            Année de création
                        </label>
                        <input
                            aria-label="année de création"
                            type="number"
                            name="yearofcreation"
                            id="yearofcreation"
                            value={yearofcreation}
                            onChange={handleChange}
                        />

                        <label htmlFor="description">
                            Description de l'organisme (maximum 400 caractères)
                        </label>
                        <textarea
                            aria-label="description"
                            name="description"
                            id="description"
                            cols="30"
                            rows="8"
                            maxlength="400"
                            value={description}
                            onChange={handleChange}
                        />

                        <label htmlFor="logo">Logo</label>
                        <input
                            aria-label="logo"
                            type="file"
                            name="logo"
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

                        <label htmlFor="street">Adresse</label>
                        <input
                            aria-label="adresse"
                            type="text"
                            name="street"
                            id="street"
                            value={street}
                            onChange={handleChange}
                        />

                        <label htmlFor="city">Ville</label>
                        <input
                            aria-label="ville"
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={handleChange}
                        />

                        <label htmlFor="zip">Code postal</label>
                        <input
                            aria-label="code postal"
                            type="number"
                            name="zip"
                            id="zip"
                            value={zip}
                            onChange={handleChange}
                        />

                        <input type="submit" value="S'enregistrer" />
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

export default FormEditSchool;
