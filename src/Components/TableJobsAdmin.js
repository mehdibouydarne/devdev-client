import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../utils/authHeader";

const TableJobsAdmin = () => {
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST}/job`, { headers: authHeader() }).then((res) => {
            setJobs(res.data);
            if (res.data.message) {
                return setMessage(res.data.message);
            }
        });
    }, [jobs]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${process.env.REACT_APP_HOST}/job/delete-post/${id}`, {
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
                        <th>Nom du poste</th>
                        <th>Languages</th>
                        <th>Durée</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, i) => (
                        <tr key={i}>
                            <td>{job.informations.name}</td>
                            <td>{job.informations.languages}</td>
                            <td>{job.informations.duration}</td>
                            <td>
                                <div>
                                    <NavLink
                                        to={`/admin/edit-job/${job._id}`}
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
                                        onClick={() => handleDelete(job._id)}
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

export default TableJobsAdmin;
