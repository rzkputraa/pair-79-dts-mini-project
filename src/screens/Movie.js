import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from 'axios';
import { Box } from "@mui/system";
import { Button, Container, Typography } from "@mui/material";
import { Star, PlayArrowRounded, InfoOutlined } from '@mui/icons-material';
import Popular from "../components/Popular";
import { grey } from '@mui/material/colors';

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [movieLogo, setMovieLogo] = useState(null);

  const getMovie = async (id) => {
    try {
      const response = await axios.get(process.env.REACT_APP_IMDB_URL + '/movie/' + id, {
        params: {
          api_key: process.env.REACT_APP_IMDB_API_KEY
        }
      });

      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getImagesMovie = async (id) => {
    setMovieLogo(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_IMDB_URL}/movie/${id}/images`, {
        params: {
          api_key: process.env.REACT_APP_IMDB_API_KEY,
          language: 'en'
        }
      });
      setBackdrop(response.data.backdrops[0].file_path);
      setMovieLogo(response.data.logos[0].file_path);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovie(params.id);
    getImagesMovie(params.id);
  }, [params.id]);

  return (
    <Layout ml="0px" mr="0px">

      {movie && (
        <Box sx={{
          backgroundImage: `url(${process.env.REACT_APP_IMDB_IMAGE_URL}/${movie.backdrop_path})`,
          backgroundPositionX: 'center',
          backgroundPositionY: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundColor: 'black',
          width: '100%',
          height: '600px',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(19deg, rgba(0,0,0,1) 0%, rgba(28,28,192,0.03918662191439071) 50%)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Box sx={{
              paddingLeft: 8,
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
              {movieLogo && <img style={{ display: 'block', width: '500px' }} src={`${process.env.REACT_APP_IMDB_IMAGE_URL}/${movieLogo}`} alt="" />}
              <div style={{
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Button variant="contained" sx={{ textTransform: 'capitalize', marginRight: 2 }} color='white'><PlayArrowRounded /> Play</Button>
                <Button variant="outlined" sx={{ textTransform: 'capitalize' }} color='white'><InfoOutlined /> Information</Button>
              </div>
            </Box>
          </div>
        </Box>
      )}
      <Container sx={{ marginTop: 5 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Typography mr={2} fontSize={36} fontWeight='bold'>{movie?.title}</Typography>
          <Typography sx={{
            display: 'flex',
          }}><Star sx={{ marginRight: '5px', color: 'gold' }} /> {movie?.vote_average}/10</Typography>
        </Box>
        <Typography fontSize={18}>{movie?.overview}</Typography>
        <Popular />
      </Container>
    </Layout>
  );
}

export default Movie;