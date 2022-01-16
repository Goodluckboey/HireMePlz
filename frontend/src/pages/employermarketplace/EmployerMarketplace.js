import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Useridcontext from "../../context/userid-context";
import Button from "../../generalcomponent/Button";
import InputField from "../../generalcomponent/InputField";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";
import Employee from "./parts/Employee";

const EmployerMarketplace = () => {
  // context
  const { userId, picsArray } = useContext(Useridcontext);

  // states
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [fetchedEmployees, setFetchedEmployees] = useState([]);

  // fetch employees on mount
  async function fetcher() {
    try {
      const endpoint = `http://127.0.0.1:5000/allemployees`;
      const res = await axios.get(endpoint);
      setFetchedEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userId) {
      fetcher();
    }
  }, []);

  // button on click function to search for employee with this specific name
  const handleSearchEmployee = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `http://127.0.0.1:5000/searchemployee`;
      const res = await axios.post(endpoint, { query: employeeQuery });
      setFetchedEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // create employee components to populate page
  const employees = [];
  for (const employee of fetchedEmployees) {
    employees.push(
      <Employee
        {...employee}
        key={uuidv4()}
        imageUrl={
          picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
        }
      ></Employee>
    );
  }

  return (
    <div>
      {userId ? (
        <>
          <form>
            <InputField
              placeholder="search jobs by employee name"
              value={employeeQuery}
              onChange={(e) => {
                setEmployeeQuery(e.target.value);
              }}
            ></InputField>
            <Button value="Search" onClick={handleSearchEmployee}></Button>
          </form>
          <div>{employees}</div>
        </>
      ) : (
        <NotLoggedIn></NotLoggedIn>
      )}
    </div>
  );
};

export default EmployerMarketplace;
