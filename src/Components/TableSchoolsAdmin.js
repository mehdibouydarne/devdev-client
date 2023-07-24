import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableSchoolsAdmin = () => {
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/school`, { headers: authHeader() })
            .then((res) => {
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
                setSchools(res.data);
            });
    }, [schools]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/school/delete-school/${id}`, {
                headers: authHeader(),
            })
            .then((res) => {
                if (res.data.message) {
                    setMessage(res.data.message);
                }
            });
    };

    return (
        <>
            {message && <span className="error-message">{message}</span>}
            {schools.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nom de l'école</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.map((school, i) => (
                            <tr key={i}>
                                <td>{school.informations.name}</td>
                                <td>{school.contacts.email}</td>
                                <td>{JSON.stringify(school.isAdmin)}</td>
                                <td>
                                    <div>
                                        <NavLink
                                            to={`/admin/edit-school/${school._id}`}
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
                                            onClick={() =>
                                                handleDelete(school._id)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>{message}</p>
            )}
        </>
    );
};

export default TableSchoolsAdmin;
