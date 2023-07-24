import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CardNews = () => {
    const [news, setNews] = useState([]);
    const [message, setMessage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/new`).then((res) => {
            setNews(res.data);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? news.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === news.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <article className="card-home card-home-3">
            <img
                src="./assets/img/picto-arrow-1.png"
                alt="arrow"
                className="picto-arrow-1"
                id="picto-arrow-1-1"
                onClick={handlePrevClick}
            />
            {news[currentIndex] && (
                <NavLink to={`/news/${news[currentIndex]._id}`}>
                    <figure>
                        <img
                            src={`${process.env.REACT_APP_HOST}/assets/img/${news[currentIndex].image.src}`}
                            alt={news[currentIndex].image.alt}
                            className="img-home-article"
                        />
                        <h2>
                            {news[currentIndex].title.length > 18
                                ? `${news[currentIndex].title.substring(
                                      0,
                                      18
                                  )}...`
                                : news[currentIndex].title}
                        </h2>
                    </figure>
                </NavLink>
            )}
            <img
                src="./assets/img/picto-arrow-1.png"
                alt="arrow"
                className="picto-arrow-1 picto-arrow-1-2"
                onClick={handleNextClick}
            />
        </article>
    );
};

export default CardNews;
