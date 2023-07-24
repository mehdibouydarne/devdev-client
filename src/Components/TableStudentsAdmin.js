import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableStudentsAdmin = () => {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/student`, { headers: authHeader() })
            .then((res) => {
                if (res.data.message) {
                    return setMessage(res.data.message);
                }
                setStudents(res.data);
            });
    }, [students]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/student/delete-student/${id}`, {
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
            {students.length > 0 ? (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nom de l'étudiant</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, i) => (
                            <tr key={i}>
                                <td>
                                    {student.informations.name}{" "}
                                    {student.informations.firstname}
                                </td>
                                <td>{student.contacts.email}</td>
                                <td>{JSON.stringify(student.isAdmin)}</td>
                                <td>
                                    <div>
                                        <NavLink
                                            to={`/admin/edit-student/${student._id}`}
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
                                                handleDelete(student._id)
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

export default TableStudentsAdmin;
