import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableDegrees = () => {
    const [degrees, setdegrees] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/degree/by-school`, { headers: authHeader() })
            .then((res) => {
                setdegrees(res.data);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, [degrees]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/degree/delete-post/${id}`, {
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
                        <th>Nom du diplôme</th>
                        <th>Languages</th>
                        <th>Durée</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {degrees.map((degree, i) => (
                        <tr key={i}>
                            <td>{degree.informations.name}</td>
                            <td>{degree.informations.languages}</td>
                            <td>{degree.informations.duration}</td>
                            <td>
                                <div>
                                    <NavLink
                                        to={`/profile/edit-degree/${degree._id}`}
                                    >
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
                                        onClick={() => handleDelete(degree._id)}
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

export default TableDegrees;
