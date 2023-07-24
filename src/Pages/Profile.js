import { NavLink } from "react-router-dom";
import { useState } from "react";

import TableDegrees from "../Components/TableDegrees";
import TableJobs from "../Components/TableJobs";

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <main>
            <section className="admin">
                {user ? (
                    <>
                        {user.userType === "school" && (
                            <>
                                <figure>
                                    <h1>Mon profil</h1>
                                    <NavLink to="/profile/edit-school">
                                        <img
                                            src="./assets/img/picto-nut.png"
                                            alt="picto-nut"
                                            className="picto-nut"
                                        />
                                    </NavLink>
                                </figure>

                                <h2>Liste des diplômes</h2>
                                <figure>
                                    <NavLink to="/profile/add-degree">
                                        <img
                                            src="./assets/img/picto-plus.png"
                                            alt="picto-plus"
                                            className="picto-plus"
                                        />
                                        <h3>Ajouter un diplôme</h3>
                                    </NavLink>
                                </figure>
                                <TableDegrees />
                            </>
                        )}

                        {user.userType === "recruiter" && (
                            <>
                                <figure>
                                    <h1>Mon profil</h1>
                                    <NavLink to="/profile/edit-recruiter">
                                        <img
                                            src="./assets/img/picto-nut.png"
                                            alt="picto-nut"
                                            className="picto-nut"
                                        />
                                    </NavLink>
                                </figure>

                                <h2>Liste des offres d'emploi</h2>
                                <figure>
                                    <NavLink to="/profile/add-job">
                                        <img
                                            src="./assets/img/picto-plus.png"
                                            alt="picto-plus"
                                            className="picto-plus"
                                        />
                                        <h3>Ajouter une offre</h3>
                                    </NavLink>
                                </figure>
                                <TableJobs />
                            </>
                        )}

                        {user.userType === "student" && (
                            <figure>
                                <h1>Mon profil</h1>
                                <NavLink to="/profile/edit-student">
                                    <img
                                        src="./assets/img/picto-nut.png"
                                        alt="picto-nut"
                                        className="picto-nut"
                                    />
                                </NavLink>
                            </figure>
                        )}

                        {user.userType === "user" && (
                            <h3 className="authenticate-message ">
                                Connectez-vous en tant qu'étudiant, école ou
                                recruteur pour accéder à votre profil
                            </h3>
                        )}
                    </>
                ) : (
                    <h3 className="authenticate-message ">
                        Connectez-vous en tant qu'étudiant, école ou recruteur
                        pour accéder à votre profil
                    </h3>
                )}
            </section>
        </main>
    );
};

export default Profile;
