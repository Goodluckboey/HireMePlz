import React from "react";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/splide/dist/css/splide.min.css";
import FrontPageHeader from "./parts/FrontPageHeader";

const FrontPage = () => {
  return (
    <div id="FrontPage">
      <div>
        <FrontPageHeader></FrontPageHeader>
      </div>
      {/* <Splide
      // options={{
      //   speed: "3000",
      //   autoplay: true,
      //   type: "loop",
      //   pauseOnHover: true,
      //   wheel: true,
      //   drag: true,
      // }}
      >
        <SplideSlide
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
        </SplideSlide>
        <SplideSlide
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
          data-aos-delay="50"
          data-aos-duration="1000"
        ></SplideSlide>
        <SplideSlide
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
          data-aos-delay="50"
          data-aos-duration="1000"
        ></SplideSlide>
      </Splide> */}
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
