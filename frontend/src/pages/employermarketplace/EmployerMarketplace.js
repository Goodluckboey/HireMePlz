import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Useridcontext from "../../context/userid-context";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import Employee from "./parts/Employee";

const EmployerMarketplace = () => {
  // context
  const { userId } = useContext(Useridcontext);

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
    if (userId) {
      fetcher();
    }
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
      {userId ? (
        <>
          <InputField
            placeholder="search jobs by employee name"
            value={employeeQuery}
            onChange={(e) => {
              setEmployeeQuery(e.target.value);
            }}
          ></InputField>
          <Button value="Search" onClick={handleSearchEmployee}></Button>
          <div>{employees}</div>
        </>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </div>
  );
};

export default EmployerMarketplace;
