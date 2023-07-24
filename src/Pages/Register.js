import { useState } from "react";

import FormRegisterStudents from "../Components/FormRegisterStudents";
import CardNewsletter from "../Components/CardNewsletter";
import FormRegisterSchools from "../Components/FormRegisterSchools";
import FormRegisterRecruiters from "../Components/FormRegisterRecruiters";
import FormRegisterUsers from "../Components/FormRegisterUsers";

const Register = () => {
    const [typeUser, setTypeUser] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "type_user") {
            setTypeUser(e.target.value);
        }
    };

    return (
        <main>
            <section className="register">
                <article>
                    <form method="post" className="form-register">
                        <legend>Créer un compte</legend>
                        <label htmlFor="type_user">Vous êtes :</label>
                        <select
                            name="type_user"
                            id="type_user"
                            value={typeUser}
                            onChange={handleChange}
                        >
                            <option value="no_type_user">Sélectionner</option>
                            <option value="student">Un(e) étudiant(e)</option>
                            <option value="school">Une école</option>
                            <option value="recruiter">
                                Un(e) recruteur•euse
                            </option>
                            <option value="user">Autre</option>
                        </select>
                    </form>
                    {typeUser === "student" ? (
                        <FormRegisterStudents />
                    ) : typeUser === "school" ? (
                        <FormRegisterSchools />
                    ) : typeUser === "recruiter" ? (
                        <FormRegisterRecruiters />
                    ) : typeUser === "user" ? (
                        <FormRegisterUsers />
                    ) : (
                        ""
                    )}
                </article>
                {typeUser === "student" ? <CardNewsletter /> : ""}
            </section>
        </main>
    );
};

export default Register;
