import React from "react";
import FrontPageHeader from "./parts/FrontPageHeader";

const FrontPage = () => {
  return (
    <div id="FrontPage">
      <div>
        <FrontPageHeader></FrontPageHeader>
      </div>
      <div>
        <form>
          <input
            id="searchbar"
            type="text"
            placeholder="Search.."
            // onKeyPress={(e) => searchCheck(e)}
          ></input>
        </form>
      </div>
      <div>
        <h1>Why Choose Us?</h1>
      </div>
    </div>
  );
};

export default FrontPage;
