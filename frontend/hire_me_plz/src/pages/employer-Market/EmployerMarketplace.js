import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import Employee from "./parts/Employee";

const EmployerMarketplace = () => {
  // states
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [fetchedEmployees, setFetchedEmployees] = useState([]);

  // fetch employees on mount
  useEffect(() => {
    async function fetcher() {
      try {
        const endpoint = `http://127.0.0.1:5000/`;
        const res = await axios.get(endpoint);
        setFetchedEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetcher();
  }, []);

  // button on click function to search for job with this specific name
  const handleSearchEmployee = async () => {
    try {
      const endpoint = `http://127.0.0.1:5000/`;
      const employees = await axios.post(endpoint, { query: employeeQuery });
      setFetchedEmployees(employees);
    } catch (err) {
      console.log(err);
    }
  };

  // create employee components to populate page
  const employees = [];
  for (const employee of fetchedEmployees) {
    employees.push(<Employee {...employee}></Employee>);
  }

  return (
    <div>
      <InputField
        placeholder="search jobs by employee name"
        value={employeeQuery}
        onChange={(e) => {
          setEmployeeQuery(e.target.value);
        }}
      ></InputField>
      <Button value="Search" onClick={handleSearchEmployee}></Button>
      <div>{employees}</div>
    </div>
  );
};

export default EmployerMarketplace;
