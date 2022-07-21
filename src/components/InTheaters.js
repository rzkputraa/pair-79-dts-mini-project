// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import TrendingItem from "./TrendingItem";
import axios from "axios";
import { useEffect, useState } from "react";

import "./Trending.css";
import { Typography } from "@mui/material";

export default function InTheaters() {
  const [InTheaters, setInTheaters] = useState([]);

  const getInTheaters = async () => {
    let response = await axios.get(
      process.env.REACT_APP_IMDB_URL + "/movie/now_playing",
      {
        params: {
          api_key: process.env.REACT_APP_IMDB_API_KEY,
        },
      }
    );
    setInTheaters(response.data.results);
  };

  useEffect(() => {
    getInTheaters();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <Typography
        fontSize={36}
        fontWeight="bold"
        sx={{ marginBottom: "15px", marginTop: "15px" }}
      >
        In Theaters
      </Typography>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        allowTouchMove
        spaceBetween={20}
        loop
        centeredSlides
        slidesPerView={2}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        navigation
        pagination={{ clickable: true }}
        style={{
          borderRadius: 10,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {InTheaters.length === 0
          ? console.log("loading")
          : InTheaters.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <TrendingItem height="77vh" movie={movie} />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}
