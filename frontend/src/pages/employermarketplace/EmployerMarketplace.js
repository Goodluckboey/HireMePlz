// dependencies
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Useridcontext from "../../context/userid-context";
import { v4 as uuidv4 } from "uuid";

// css modules
import styles from "./parts/modules/er.module.css";

// child components
import Employee from "./parts/Employee";
import TagsCheckBoxBundle from "../../generalcomponent/TagsCheckBoxBundle";
import SearchFilter from "../../generalcomponent/SearchFilter";
import { Link, useHistory } from "react-router-dom";

const EmployerMarketplace = () => {
  // context
  const { userId, picsArray, switchMode, setSwitchMode } =
    useContext(Useridcontext);

  // use history
  const history = useHistory();

  //state change
  // const handleModeChange = () => {
  //   setSwitchMode(false);
  // };

  // states
  const [employeeQuery, setEmployeeQuery] = useState("");
  const [fetchedEmployees, setFetchedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]); // tags
  const [searchType, setSearchType] = useState(""); // search type

  // button on click function to search for employee with this specific name
  const handleSearchEmployee = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const endpoint = `http://127.0.0.1:5000/searchemployee?type=${searchType}`;
      const res = await axios.post(endpoint, {
        query: employeeQuery,
        tags,
      });
      setFetchedEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  // fetch employees on mount, search changes
  useEffect(() => {
    if (!switchMode) {
      history.push("/employeemarketplace");
    }
    setIsLoading(true);
    const timer = setTimeout(handleSearchEmployee, 1000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [employeeQuery, tags, searchType, switchMode]);

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
      {/* <Link className={styles.switchTo} to="/employeemarketplace">
        <button
          type="button"
          class="btn btn-success"
          onClick={handleModeChange}
        >
          Switch to Employee
        </button>
      </Link> */}
      <div className={styles.banner}>
        <img
          id={styles.marketImage}
          src="/images/clouds-gb0edf16cc_1920.jpg"
          alt=""
        ></img>
        <form>
          <h2 id={styles.marketTitleText}>
            Whether it's finding a missing dog, or cheating on <br />
            your science project, find the perfect applicant here!
          </h2>
          <div>
            <input
              id={styles.searchbar}
              type="text"
              placeholder="Search jobs by employee name.."
              value={employeeQuery}
              onChange={(e) => {
                setEmployeeQuery(e.target.value);
              }}
            ></input>
          </div>

          <TagsCheckBoxBundle handleData={setTags} />
          <SearchFilter setFilter={setSearchType} />

          <button id={styles.submitButton} onClick={handleSearchEmployee}>
            <i class="fas fa-search"></i>
          </button>
        </form>
        <div className={styles.smallIcons}>
          <i class="fab fa-facebook fa-3x"></i>
          <i class="fab fa-instagram fa-3x"></i>
          <i class="fab fa-twitter fa-3x"></i>
        </div>
      </div>

      {/* <form>
            <InputField
              placeholder="search jobs by employee name"
              value={employeeQuery}
              onChange={(e) => {
                setEmployeeQuery(e.target.value);
              }}
            ></InputField>
            <Button value="Search" onClick={handleSearchEmployee}></Button>
          </form> */}
      {isLoading ? (
        <div className={styles.loadingSpinner}>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.cardBox}>{employees}</div>
      )}
    </div>
  );
};

export default EmployerMarketplace;
