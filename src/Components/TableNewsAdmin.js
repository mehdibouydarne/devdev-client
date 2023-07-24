import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableNewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/new`, { headers: authHeader() }).then((res) => {
            setNews(
                res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            );
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, [news]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/new/delete-post/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    };

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nom de l'auteur</th>
                        <th>Titre de l'article</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((new_, i) => (
                        <tr key={i}>
                            <td>{new_.author}</td>
                            <td>{new_.title}</td>
                            <td>
                                {new Date(new_.date).toLocaleDateString(
                                    "fr-FR",
                                    { month: "long", year: "numeric" }
                                )}
                            </td>
                            <td>
                                <div>
                                    <NavLink to={`/admin/edit-new/${new_._id}`}>
                                        <img
                                            src="./assets/img/picto-pencil.png"
                                            alt="picto-pencil"
                                            className="picto-pencil"
                                        />
                                    </NavLink>
                                    <img
                                        src="./assets/img/picto-cross.png"
                                        alt="picto-cross"
                                        className="picto-cross"
                                        onClick={() => handleDelete(new_._id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TableNewsAdmin;
