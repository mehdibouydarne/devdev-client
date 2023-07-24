import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CardNew = () => {
    const [news, setNews] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/new`).then((res) => {
            setNews(
                res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            );
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, []);

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <article className="list-news">
                {news.map((new_, i) => (
                    <article className="card-new">
                        <NavLink to={`/news/${new_._id}`} key={i}>
                            <figure>
                                <img
                                    src={`${process.env.REACT_APP_HOST}/assets/img/${new_.image.src}`}
                                    alt={new_.image.alt}
                                    className="img-news-article"
                                />
                                <h2>
                                    {new_.title.length > 18
                                        ? `${new_.title.substring(0, 18)}...`
                                        : new_.title}
                                </h2>
                            </figure>
                        </NavLink>
                    </article>
                ))}
            </article>
        </>
    );
};

export default CardNew;
