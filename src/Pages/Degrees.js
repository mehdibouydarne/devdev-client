import { useState } from "react";

import FormSearchDegrees from "../Components/FormSearchDegrees";
import CardDegree from "../Components/CardDegree";

const Degrees = () => {
    const [search, setSearch] = useState("");
    const [duration, setDuration] = useState("no-duration");
    const [funding, setFunding] = useState("no-funding");

    const handleChange = (e) => {
        if (e.target.name === "search") {
            setSearch(e.target.value);
        } else if (e.target.name === "funding") {
            setFunding(e.target.value);
        } else if (e.target.name === "duration") {
            setDuration(e.target.value);
        }
    };

    return (
        <main>
            <section className="degrees">
                <h1>Écoles & organismes de formation</h1>
                <FormSearchDegrees
                    search={search}
                    duration={duration}
                    funding={funding}
                    handleChange={handleChange}
                />
                <CardDegree
                    search={search}
                    duration={duration}
                    funding={funding}
                />
            </section>
        </main>
    );
};

export default Degrees;
