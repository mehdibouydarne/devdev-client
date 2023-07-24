import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CardDegree = ({ search, duration, funding }) => {
    const [degrees, setDegrees] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/degree`).then((res) => {
            setDegrees(res.data);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, []);

    const filteredDegrees = degrees.filter((degree) => {
        let isSearchMatch = true;
        let isDurationMatch = true;
        let isFundingMatch = true;

        if (search.trim() !== "") {
            isSearchMatch = degree.informations.name
                .toLowerCase()
                .includes(search.toLowerCase());
        }

        if (duration !== "no-duration") {
            isDurationMatch = degree.informations.duration === duration;
        }

        if (funding !== "no-funding") {
            const [minFees, maxFees] = funding.split("-");
            isFundingMatch =
                degree.informations.fees >= parseInt(minFees) &&
                degree.informations.fees <= parseInt(maxFees);
        }

        return isSearchMatch && isDurationMatch && isFundingMatch;
    });

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <article className="list-degrees">
                {filteredDegrees.map((degree, i) => {
                    return (
                        <article className="card-degree" key={i}>
                            <NavLink to={`/degrees/${degree._id}`} key={i}>
                                <figure>
                                    <img
                                        src={`${process.env.REACT_APP_HOST}/assets/img/${degree.school.logo.src}`}
                                        alt=""
                                        className="logo-degrees-school"
                                    />
                                    <h3>{degree.school.informations.name}</h3>
                                </figure>
                                <ul>
                                    <h4>{degree.informations.name}</h4>
                                    <li>
                                        <span>Durée : </span>
                                        {degree.informations.duration}
                                    </li>
                                    <li>
                                        <span>Langages : </span>
                                        {degree.informations.languages.length >
                                        10
                                            ? `${degree.informations.languages.substring(
                                                  0,
                                                  10
                                              )}...`
                                            : degree.informations.languages}
                                    </li>
                                    <li>
                                        <span>Ville : </span>
                                        {degree.school.address.city}
                                    </li>
                                </ul>
                            </NavLink>
                        </article>
                    );
                })}
            </article>
        </>
    );
};

export default CardDegree;
