const FormSearchDegrees = ({ search, duration, funding, handleChange }) => {
    return (
        <form action="" className="form-search-degrees">
            <input
                name="search"
                type="text"
                placeholder="Rechercher par nom"
                value={search}
                onChange={handleChange}
            />

            <select
                name="duration"
                id="duration"
                value={duration}
                onChange={handleChange}
            >
                <option value="no-duration">Durée</option>
                <option value="1">1 an</option>
                <option value="2">2 ans</option>
                <option value="3">3 ans</option>
                <option value="5">5 ans</option>
            </select>

            <select
                name="funding"
                id="funding"
                value={funding}
                onChange={handleChange}
            >
                <option value="no-funding">Budget par année</option>
                <option value="0-3000">0€ à 3000€</option>
                <option value="3000-6000">3000€ à 6000€</option>
                <option value="6000-10000">6000€ à 10000€</option>
                <option value="10000-10000000000">Plus de 10000€</option>
            </select>
        </form>
    );
};

export default FormSearchDegrees;
