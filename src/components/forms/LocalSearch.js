import React from "react";

const LocalSearch = ({ keyword, setKeyword, placeholder }) => {

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <input type="search"
            placeholder={placeholder ? placeholder : "filter"}
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4" />
    );
}

export default LocalSearch;