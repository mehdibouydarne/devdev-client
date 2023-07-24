const AboutUs = () => {
    return (
        <main className="aboutus-no-scroll">
            <section className="aboutus">
                <article>
                    <h1>Qui sommes-nous ?</h1>
                    <p>
                        Parti à la base d'un projet de fin d'année d'études qui
                        n'avait d'autre but que de permettre au fondateur
                        d'obtenir son diplôme, DevDev s'est très vite retrouvé
                        asailli par les utilisateurs. Étant la seule plateforme
                        réunissant à la fois une liste exhaustive des écoles
                        d'informatique et une multitude d'offres d'alternance,
                        nous nous sommes positionné sur un marché quasimment
                        inexistant.
                    </p>
                    <p>
                        Nous sommes aujourd'hui en première place des médias les
                        plus consultés par les étudiants en informatique et
                        comptez sur nous pour ne pas la quitter.
                    </p>
                    <p>
                        Si tu souhaites nous rejoindre,{" "}
                        <a href="mailto:devdev@icloud.com">clique ici</a> !
                    </p>
                </article>
                <article>
                    <h4>Notre équipe :</h4>
                    <ul className="list-employees">
                        <li>
                            <figure>
                                <img
                                    src="./assets/img/employee-1.jpeg"
                                    alt="employee"
                                    className="employee"
                                />
                                <figcaption>Anne</figcaption>
                            </figure>
                        </li>
                        <li>
                            <figure>
                                <img
                                    src="./assets/img/employee-2.jpeg"
                                    alt="employee"
                                    className="employee"
                                />
                                <figcaption>Siloé</figcaption>
                            </figure>
                        </li>
                        <li>
                            <figure>
                                <img
                                    src="./assets/img/employee-3.jpeg"
                                    alt="employee"
                                    className="employee"
                                />
                                <figcaption>Adama</figcaption>
                            </figure>
                        </li>
                        <li>
                            <figure>
                                <img
                                    src="./assets/img/employee-4.jpeg"
                                    alt="employee"
                                    className="employee"
                                />
                                <figcaption>Steven</figcaption>
                            </figure>
                        </li>
                    </ul>
                </article>
            </section>
        </main>
    );
};

export default AboutUs;
