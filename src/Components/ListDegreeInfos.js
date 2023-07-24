import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const ListDegreeInfos = () => {
    const { id } = useParams();
    const [degree, setDegree] = useState("");
    const [degreeName, setDegreeName] = useState("");
    const [duration, setDuration] = useState("");
    const [fees, setFees] = useState("");
    const [languages, setLanguages] = useState("");
    const [school, setSchool] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [yearofcreation, setYearofcreation] = useState("");
    const [description, setDescription] = useState("");
    const [logoSrc, setLogoSrc] = useState("");
    const [logoAlt, setLogoAlt] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/degree/${id}`, { headers: authHeader() })
            .then((res) => {
                setDegree(res.data);
                setDegreeName(res.data.informations.name);
                setDuration(res.data.informations.duration);
                setFees(res.data.informations.fees);
                setLanguages(res.data.informations.languages);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/school/${degree.school}`, {
                headers: authHeader(),
            })
            .then((res) => {
                setSchool(res.data);
                setSchoolName(res.data.informations.name);
                setYearofcreation(res.data.informations.yearofcreation);
                setDescription(res.data.informations.description);
                setLogoSrc(res.data.logo.src);
                setLogoAlt(res.data.logo.alt);
                setEmail(res.data.contacts.email);
                setPhone(res.data.contacts.phone);
                setStreet(res.data.address.street);
                setCity(res.data.address.city);
                setZip(res.data.address.zip);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, [degree]);

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <section className="degree">
                <figure>
                    <img
                        src={`${process.env.REACT_APP_HOST}/assets/img/${logoSrc}`}
                        alt={logoAlt}
                        className="logo-degree-school"
                    />
                    <figcaption>
                        <h1>{schoolName}</h1>
                        <h2>
                            {city}, depuis {yearofcreation}
                        </h2>
                    </figcaption>
                </figure>
                <article className="list-degree-infos">
                    <article className="card-degree-info">
                        <h2>Présentation de l'école</h2>
                        <p>{description}</p>
                    </article>
                    <ul className="card-degree-info">
                        <h2>{degreeName}</h2>
                        <li>Les langages enseignés sont : {languages}</li>
                        <li>Le parcours dure {duration} ans</li>
                        <li>Les frais scolaires s'élèvent à {fees}€ par an</li>
                    </ul>
                    <ul className="card-degree-info">
                        <h2>Contact</h2>
                        <li>{email}</li>
                        <li>{phone}</li>
                        <li>
                            {street}, {zip}, {city}
                        </li>
                    </ul>
                </article>
            </section>
        </>
    );
};

export default ListDegreeInfos;
