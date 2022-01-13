import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const FrontPage = () => {
  return (
    <div id="FrontPage">
      <Splide
        options={{
          // gap: "0rem",
          speed: "3000",
          autoplay: true,
          type: "loop",
          pauseOnHover: true,
          wheel: true,
          // interval: 10,
          drag: true,
        }}
      >
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
        <SplideSlide
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
          data-aos-delay="50"
          data-aos-duration="1000"
        ></SplideSlide>
      </Splide>
    </div>
  );
};

export default FrontPage;
