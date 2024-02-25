import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import CourseRec from "./CourseRec";

export const Recommendations = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    arrows: false,
  };
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (true) {
          const res = await axios.post(
            "http://127.0.0.1:8000/recommend",
            {},
            {
              headers: {
                token: `${localStorage.getItem("jwt")}`,
                "Content-Type": `application/json`,
              },
            }
          );

          setRecommendations(res.data.recommendations);
          //console.log(res.data.recommendations);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-11/12 lg:w-full mx-auto rounded-md ">
      <Slider {...settings}>
        {recommendations.map((code, index) => (
          <CourseRec key={index} code={code} />
        ))}
      </Slider>
    </div>
  );
};
