import { useState } from "react";
import axios from "axios";

const FormRegisterSchools = () => {
    const [name, setName] = useState("");
    const [yearofcreation, setYearofcreation] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState(null);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");

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
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "confirmed_password") {
            setConfirmedPassword(e.target.value);
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
        formData.append("password", password);
        formData.append("userType", "school");

        if (password === confirmedPassword) {
            axios.post(`${process.env.REACT_APP_HOST}/school/register`, formData).then((res) => {
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
                encType="multipart/form-data"
            >
                <label htmlFor="name">Nom de l'école</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                />

                <label htmlFor="yearofcreation">Année de création</label>
                <input
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
                    name="description"
                    id="description"
                    cols="30"
                    rows="8"
                    maxLength="400"
                    value={description}
                    onChange={handleChange}
                />

                <label htmlFor="logo">Logo</label>
                <input type="file" name="logo" onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                />

                <label htmlFor="phone">Numéro de téléphone</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={handleChange}
                />

                <label htmlFor="street">Adresse</label>
                <input
                    type="text"
                    name="street"
                    id="street"
                    value={street}
                    onChange={handleChange}
                />

                <label htmlFor="city">Ville</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                />

                <label htmlFor="zip">Code postal</label>
                <input
                    type="number"
                    name="zip"
                    id="zip"
                    value={zip}
                    onChange={handleChange}
                />

                <label htmlFor="password">Mot de passe</label>
                <input
                    required
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
                    required
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

export default FormRegisterSchools;
