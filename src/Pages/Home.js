import CardNews from "../Components/CardNews";

const Home = () => {
    return (
        <main className="home-no-scroll">
            <section className="home">
                <article className="card-home card-home-1">
                    <h1>
                        Devenir <strong>développeur</strong> n'a jamais été
                        aussi <span className="underline">simple</span>{" "}
                        qu'aujourd'hui
                    </h1>
                </article>
                <article className="card-home card-home-2">
                    <article>
                        <figure>
                            <img
                                src="./assets/img/img-funder.jpeg"
                                alt=""
                                className="img-home-comment-xs"
                            />
                            <h3>Myriam El Ghazaoui - Fondatrice</h3>
                        </figure>
                        <p>
                            J'ai créé avec DevDev la plateforme que j'aurais
                            aimé avoir à ma disposition quand j'étais encore
                            étudiante, une plateforme sur laquelle on trouve des
                            formations de Bac +1 à Bac +5, des offres
                            d'alternance, de l'actualité, des conseils en dev.
                            DevDev n'était qu'un projet de fin d'études de
                            développement web et aujourd'hui c'est ce qui
                            m'anime au quotidien.
                        </p>
                    </article>
                    <article className="img-home-comment-xl"></article>
                </article>
                <CardNews />
                <article className="card-home card-home-4">
                    <h2>Trouver ma formation en 2 minutes </h2>
                    <p>
                        Remplissez un court questionnaire qui vous permettra de
                        découcrir quel cursus est le plus adapté pour vous selon
                        vos moyens et le temps que vous souhaitez y accorder
                    </p>
                    <img
                        src="./assets/img/picto-go.png"
                        alt="go"
                        className="picto-go"
                    />
                </article>
            </section>
        </main>
    );
};

export default Home;
