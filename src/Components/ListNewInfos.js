import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CardNewTwo from "./CardNewTwo";

const ListNewInfos = () => {
    const { id } = useParams();
    const [new_, setNew_] = useState([]);
    const [imageSrc, setImageSrc] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/new/${id}`).then((res) => {
            setNew_(res.data);
            setImageSrc(res.data.image.src);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, [id]);

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <section className="new">
                <article className="article-new">
                    <h1>{new_.title}</h1>
                    <h2>{new_.introduction}</h2>
                    <div className="content-new">
                        <article>
                            <figure>
                                <img
                                    src={`${process.env.REACT_APP_HOST}/assets/img/${imageSrc}`}
                                    alt=""
                                    className="img-new"
                                />
                                <figcaption>
                                    {new_.author}, le {new_.date}
                                </figcaption>
                            </figure>
                            <p>{new_.content}</p>
                        </article>
                        <article className="list-news-short">
                            <h2>Autres actualités</h2>
                            <CardNewTwo />
                        </article>
                    </div>
                </article>
            </section>
        </>
    );
};

export default ListNewInfos;
