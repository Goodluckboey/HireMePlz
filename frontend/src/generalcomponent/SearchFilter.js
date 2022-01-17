import React, { useEffect, useState } from "react";

const SearchFilter = ({ setFilter }) => {
  const [typeOfFilter, setTypeOfFilter] = useState("or");
  const handleSelection = (e) => {
    setTypeOfFilter(e.target.value);
  };

  useEffect(() => {
    setFilter(typeOfFilter);
  }, [typeOfFilter]);

  return (
    <div>
        <input
          type="radio"
          id="and"
          value="and"
          checked={typeOfFilter === "and"}
          onChange={handleSelection}
        />
        <label htmlFor="and">must contain all these skills</label>
        <input
          type="radio"
          id="or"
          value="or"
          checked={typeOfFilter === "or"}
          onChange={handleSelection}
        />
        <label htmlFor="or">contain either one of these skills</label>
    </div>
  );
};

export default SearchFilter;
