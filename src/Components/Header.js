import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [active, setActive] = useState(true);

    const handleClick = () => {
        setActive((current) => !current);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const getUserDestination = (userType) => {
        switch (userType) {
          case "user":
            return "/admin";
          case "student":
          case "school":
          case "recruiter":
            return "/profile";
        }
      };

    return (
        <header>
            <nav>
                <ul className={active ? "nav-menu js-nav-menu" : "nav-menu"}>
                    {user ? (
                        <li>
                            <h2 onClick={handleClick}>
                                <NavLink to={getUserDestination(user.userType)}>
                                    {user.informations.name}
                                </NavLink>
                            </h2>
                        </li>
                    ) : (
                        <li>
                            <h2 onClick={handleClick}>
                                <NavLink to="/register">S'enregistrer</NavLink>
                            </h2>
                        </li>
                    )}
                    <li>
                        <h2 onClick={handleClick}>
                            <NavLink to="/news">Actualités</NavLink>
                        </h2>
                    </li>
                    <li>
                        <h2 onClick={handleClick}>
                            <NavLink to="/jobs">Offres d'emploi</NavLink>
                        </h2>
                    </li>
                    {user ? (
                        <li>
                            <h2
                                onClick={() => {
                                    handleClick();
                                    handleLogout();
                                }}
                            >
                                <NavLink to="/">Se déconnecter</NavLink>
                            </h2>
                        </li>
                    ) : (
                        <li>
                            <h2 onClick={handleClick}>
                                <NavLink to="/login">Se connecter</NavLink>
                            </h2>
                        </li>
                    )}
                    <li>
                        <h2 onClick={handleClick}>
                            <NavLink to="/degrees">
                                Écoles & organismes de formation
                            </NavLink>
                        </h2>
                    </li>
                    <li>
                        <h2 onClick={handleClick}>
                            <NavLink to="/aboutus">Qui sommes-nous ?</NavLink>
                        </h2>
                    </li>
                </ul>
            </nav>
            <nav className="nav-bar">
                <NavLink to="/">
                    <h1 className="logo-website">DevDev</h1>
                </NavLink>
                <div>
                    {user ? (
                        <NavLink to="/">
                            <button className="btn-1" onClick={handleLogout}>
                                Se déconnecter
                            </button>
                        </NavLink>
                    ) : (
                        <NavLink to="/login">
                            <button className="btn-1">Se connecter</button>
                        </NavLink>
                    )}
                    {user ? (
                        <NavLink to={getUserDestination(user.userType)}>
                            <button className="btn-1">
                                {user.informations.name}
                            </button>
                        </NavLink>
                    ) : (
                        <NavLink to="/register">
                            <button className="btn-1">S'enregistrer</button>
                        </NavLink>
                    )}
                    <img
                        src="../assets/img/picto-hamburger.png"
                        alt="hamburger"
                        className="hamburger"
                        onClick={handleClick}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
