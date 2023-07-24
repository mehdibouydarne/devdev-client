import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableRecruitersAdmin = () => {
    const [recruiters, setRecruiters] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/recruiter`, { headers: authHeader() })
            .then((res) => {
                setRecruiters(res.data);
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
            });
    }, [recruiters]);


    const handleDelete = (id) => {
        axios
            .delete(`${process.env.REACT_APP_HOST}/recruiter/delete-recruiter/${id}`, {
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
            {recruiters.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nom du recruteur</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruiters.map((recruiter, i) => (
                            <tr key={i}>
                                <td>{recruiter.informations.name}</td>
                                <td>{recruiter.contacts.email}</td>
                                <td>{JSON.stringify(recruiter.isAdmin)}</td>
                                <td>
                                    <div>
                                        <NavLink
                                            to={`/admin/edit-recruiter/${recruiter._id}`}
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
                                                handleDelete(recruiter._id)
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

export default TableRecruitersAdmin;
