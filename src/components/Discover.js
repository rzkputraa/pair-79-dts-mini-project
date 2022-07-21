import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import DiscoverItem from "./DiscoverItem";
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Discover() {
  const [discoveredMovies, setDiscoveredMovies] = useState([]);

  const getDiscoveredMovies = async () => {
    const response = await axios.get(process.env.REACT_APP_IMDB_URL + '/discover/movie', {
      params: {
        api_key: process.env.REACT_APP_IMDB_API_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: 1
      }
    });
    setDiscoveredMovies(response.data.results);
  }

  useEffect(() => {
    getDiscoveredMovies();
  }, [])

  return (
    <>
      <Typography fontSize={36} fontWeight='bold' sx={{ marginBottom: '15px', marginTop: '15px' }}>Discover</Typography>
      <Swiper

        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        allowTouchMove
        spaceBetween={20}
        loop
        centeredSlides
        breakpoints={
          {
            320: {
              slidesPerView: 2,
            },
            576: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 6,
            },
          }
        }
        onSlideChange={() => { }}
        onSwiper={(swiper) => { }}
        navigation
        pagination={{ clickable: true }}
        style={{
          borderRadius: 10
        }}
      >
        {
          discoveredMovies.length === 0
            ? console.log('loading')
            : discoveredMovies.map((movie) => {
              return (
                <SwiperSlide key={movie.id + 'test'}>
                  <DiscoverItem movie={movie} height='350px' />
                </SwiperSlide>
              );
            })
        }
      </Swiper>
    </>
  );
}

export default Discover;