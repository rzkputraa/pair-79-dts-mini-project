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

export default function Trending() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const getTrendingMovies = async () => {
    let response = await axios.get(
      process.env.REACT_APP_IMDB_URL + "/trending/movie/day",
      {
        params: {
          api_key: process.env.REACT_APP_IMDB_API_KEY,
        },
      }
    );
    setTrendingMovies(response.data.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <Typography
        fontSize={36}
        fontWeight="bold"
        sx={{ marginBottom: "15px", marginTop: "15px" }}
      >
        Trending
      </Typography>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        allowTouchMove
        spaceBetween={20}
        loop
        centeredSlides
        slidesPerView={3}
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
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
      >
        {trendingMovies.length === 0
          ? console.log("loading")
          : trendingMovies.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <TrendingItem
                    height="300px"
                    movie={movie}
                    showOverview={false}
                  />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}
