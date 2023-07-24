import { useState } from "react";

import FormSearchJobs from "../Components/FormSearchJobs";
import CardJob from "../Components/CardJob";

const Jobs = () => {
    const [duration, setDuration] = useState("no-duration");
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "search") {
            setSearch(e.target.value);
        } else if (e.target.name === "duration") {
            setDuration(e.target.value);
        }
    };

    return (
        <main>
            <section className="jobs">
                <h1>Offres d'emploi</h1>
                <FormSearchJobs
                    search={search}
                    duration={duration}
                    handleChange={handleChange}
                />
                <CardJob search={search} duration={duration} />
            </section>
        </main>
    );
};

export default Jobs;
