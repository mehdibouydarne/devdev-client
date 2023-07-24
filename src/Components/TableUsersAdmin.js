import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableUsersAdmins = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/user`, { headers: authHeader() }).then((res) => {
            setUsers(res.data);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, [users]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/user/delete-user/${id}`, {
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
            {users.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nom de l'utilisateur</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td>
                                    {user.informations.name}{" "}
                                    {user.informations.firstname}
                                </td>
                                <td>{user.contact.email}</td>
                                <td>{JSON.stringify(user.isAdmin)}</td>
                                <td>
                                    <div>
                                        <NavLink
                                            to={`/admin/edit-user/${user._id}`}
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
                                                handleDelete(user._id)
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

export default TableUsersAdmins;
