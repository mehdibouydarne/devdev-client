import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const FormEditRecruiterAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [recruiter, setRecruiter] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/recruiter/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                setRecruiter(res.data);
                setName(res.data.informations.name);
                setDescription(res.data.informations.description);
                setLogo(res.data.logo.src);
                setEmail(res.data.contacts.email);
                setPhone(res.data.contacts.phone);
                setStreet(res.data.address.street);
                setCity(res.data.address.city);
                setZip(res.data.address.zip);
                setIsAdmin(res.data.isAdmin);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
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
        } else if (e.target.name === "isAdmin") {
            setIsAdmin(e.target.checked);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("logo", logo);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("street", street);
        formData.append("city", city);
        formData.append("zip", zip);
        formData.append("isAdmin", isAdmin);

        if (user) {
            if (user.isAdmin) {
                axios
                    .put(
                        `${process.env.REACT_APP_HOST}/recruiter/admin-edit-recruiter/${id}`,
                        formData,
                        {
                            headers: authHeader(),
                        }
                    )
                    .then((res) => {
                        if (res.data.message) {
                            return setMessage(res.data.message);
                        }
                        navigate("/admin");
                    });
            } else {
                setMessage(
                    "Vous n'êtes pas habilité à modifier cet utilisateur"
                );
            }
        } else {
            setMessage("Veuillez vous authentifier");
        }
    };

    return (
        <>
            {user && user.isAdmin ? (
                <>
                    {message && (
                        <span className="error-message">{message}</span>
                    )}
                    <form
                        method="post"
                        className="form-edit"
                        onSubmit={handleSubmit}
                        enctype="multipart/form-data"
                    >
                        <label htmlFor="name">Nom de l'organisme</label>
                        <input
                            aria-label="nom"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
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
                            maxlength="400"
                            value={description}
                            onChange={handleChange}
                        />

                        <label htmlFor="logo">Logo</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={handleChange}
                        />

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

                        <article className="form-edit-checkbox">
                            <input
                                type="checkbox"
                                name="isAdmin"
                                id="isAdmin"
                                value={!isAdmin}
                                checked={isAdmin}
                                onChange={handleChange}
                            />
                            <label htmlFor="isAdmin">Admin</label>
                        </article>

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

export default FormEditRecruiterAdmin;
