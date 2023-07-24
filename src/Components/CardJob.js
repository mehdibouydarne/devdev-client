import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CardJob = ({ search, duration }) => {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/job`).then((res) => {
            setJobs(res.data);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, []);

    const filteredJobs = jobs.filter((job) => {
        let isSearchMatch = true;
        let isDurationMatch = true;

        if (search.trim() !== "") {
            isSearchMatch = job.informations.name
                .toLowerCase()
                .includes(search.toLowerCase());
        }

        if (duration !== "no-duration") {
            isDurationMatch = job.informations.duration === duration;
        }

        return isSearchMatch && isDurationMatch;
    });

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <article className="list-jobs">
                {filteredJobs.map((job, i) => (
                    <article className="card-job" key={i}>
                        <NavLink to={`/jobs/${job._id}`} key={i}>
                            <figure>
                                <img
                                    src={
                                        `${process.env.REACT_APP_HOST}/assets/img/` +
                                        job.rinformations.rlogo.src
                                    }
                                    alt={job.rinformations.alt}
                                    className="logo-jobs-company"
                                />
                                <h3>{job.rinformations.rname}</h3>
                            </figure>
                            <ul>
                                <h4>{job.informations.name}</h4>
                                <li>
                                    <span>Durée : </span>
                                    {job.informations.duration}
                                </li>
                                <li>
                                    <span>Langages : </span>
                                    {job.informations.languages.length > 10
                                        ? `${job.informations.languages.substring(
                                              0,
                                              10
                                          )}...`
                                        : job.informations.languages}
                                </li>
                                <li>
                                    <span>Ville : </span>{" "}
                                    {job.rinformations.rcity}
                                </li>
                            </ul>
                        </NavLink>
                    </article>
                ))}
            </article>
        </>
    );
};

export default CardJob;
