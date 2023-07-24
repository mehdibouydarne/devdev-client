const FormSearchJobs = ({
    searchTerm,
    duration,
    handleChange
}) => {
    return (
        <form action="" className="form-search-jobs">
            <input
                name="search"
                type="text"
                placeholder="Rechercher par nom"
                value={searchTerm}
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
        </form>
    );
};

export default FormSearchJobs;
