import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const ListJobInfos = () => {
    const { id } = useParams();
    const [job, setJob] = useState([]);
    const [jobName, setJobName] = useState("");
    const [presentation, setPresentation] = useState("");
    const [duration, setDuration] = useState("");
    const [languages, setLanguages] = useState("");
    const [link, setLink] = useState("");
    const [recruiter, setRecruiter] = useState("");
    const [logoSrc, setLogoSrc] = useState("");
    const [logoAlt, setLogoAlt] = useState("");
    const [recuiterName, setRecruiterName] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/job/${id}`).then((res) => {
            setJob(res.data);
            setJobName(res.data.informations.name);
            setPresentation(res.data.informations.presentation);
            setDuration(res.data.informations.duration);
            setLanguages(res.data.informations.languages);
            setLink(res.data.contacts.link);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/recruiter/${job.recruiter}`, {
                headers: authHeader(),
            })
            .then((res) => {
                console.log(res.data);
                setRecruiter(res.data);
                setLogoSrc(res.data.logo.src);
                setLogoAlt(res.data.logo.alt);
                setRecruiterName(res.data.informations.name);
                setDescription(res.data.informations.description);
                setEmail(res.data.contacts.email);
                setPhone(res.data.contacts.phone);
                setStreet(res.data.address.street);
                setCity(res.data.address.city);
                setZip(res.data.address.zip);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, [job]);

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <section className="job">
                <figure>
                    <img
                        src={`${process.env.REACT_APP_HOST}/assets/img/${logoSrc}`}
                        alt={logoAlt}
                        className="logo-job-company"
                    />
                    <figcaption>
                        <h1>{recuiterName}</h1>
                        <h2>{jobName}</h2>
                    </figcaption>
                </figure>
                <article className="list-job-infos">
                    <article className="card-job-info">
                        <h2>Présentation de l'entreprise</h2>
                        <p>{description}</p>
                    </article>
                    <ul className="card-job-info">
                        <h2>Présentation du poste</h2>
                        <li>Les langages demandés sont : {languages}</li>
                        <li>Le contrat dure {duration} ans</li>
                        <li>{presentation}</li>
                    </ul>
                    <ul className="card-job-info">
                        <h2>Contact</h2>
                        <li>{email}</li>
                        <li>{phone}</li>
                        <li>
                            {street}, {zip}, {city}
                        </li>
                        <li>
                            <a href={`${link}`}>
                                Accéder à la plateforme pour{" "}
                                <span>candidater</span>
                            </a>
                        </li>
                    </ul>
                </article>
            </section>
        </>
    );
};

export default ListJobInfos;
