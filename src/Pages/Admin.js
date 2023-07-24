import { NavLink } from "react-router-dom";
import { useState } from "react";

import TableDegreesAdmin from "../Components/TableDegreesAdmin";
import TableJobsAdmin from "../Components/TableJobsAdmin.js";
import TableUsersAdmin from "../Components/TableUsersAdmin.js";
import TableStudentsAdmin from "../Components/TableStudentsAdmin";
import TableSchoolsAdmin from "../Components/TableSchoolsAdmin";
import TableRecruitersAdmin from "../Components/TableRecruitersAdmin";
import TableNewsAdmin from "../Components/TableNewsAdmin";

const Admin = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <main>
            {user && user.isAdmin ? (
                <section className="admin">
                    <figure>
                        <h1>Admin</h1>
                        <NavLink to="/admin/edit-user">
                            <img
                                src="./assets/img/picto-nut.png"
                                alt="picto-nut"
                                className="picto-nut"
                            />
                        </NavLink>
                    </figure>
                    <h2>Liste des utilisateurs</h2>
                    <TableUsersAdmin />
                    <TableStudentsAdmin />
                    <TableSchoolsAdmin />
                    <TableRecruitersAdmin />
                    <h2>Liste des news</h2>
                    <figure>
                        <NavLink to="/admin/add-new">
                            <img
                                src="./assets/img/picto-plus.png"
                                alt="picto-plus"
                                className="picto-plus"
                            />
                            <h3>Ajouter une actu</h3>
                        </NavLink>
                    </figure>
                    <TableNewsAdmin />
                    <h2>Liste des diplômes</h2>
                    <figure>
                        <NavLink to="/admin/add-degree">
                            <img
                                src="./assets/img/picto-plus.png"
                                alt="picto-plus"
                                className="picto-plus"
                            />
                            <h3>Ajouter un diplôme</h3>
                        </NavLink>
                    </figure>
                    <TableDegreesAdmin />
                    <h2>Liste des offres d'emploi</h2>
                    <figure>
                        <NavLink to="/admin/add-job">
                            <img
                                src="./assets/img/picto-plus.png"
                                alt="picto-plus"
                                className="picto-plus"
                            />
                            <h3>Ajouter une offre</h3>
                        </NavLink>
                    </figure>
                    <TableJobsAdmin />
                </section>
            ) : (
                <h1 className="authenticate-message">
                    Veuillez vous authentifier
                </h1>
            )}
        </main>
    );
};

export default Admin;
