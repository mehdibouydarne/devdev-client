import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <main>
            <section className="error">
                <h1 className="authenticate-message ">
                    ERROR 404, comment êtes-vous arrivé(e) ici ??
                </h1>
                <NavLink to="/">
                    <button>Retourner à la page d'accueil</button>
                </NavLink>
            </section>
        </main>
    );
};

export default Error;
