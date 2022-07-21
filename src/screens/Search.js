import { Box, Card, Container, Grid, Paper, Typography } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Search() {
  const navParams = useParams();
  const [loading, setLoading] = useState(false);
  const [searchedMovie, setSearchMovie] = useState([]);

  const search = async (title) => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_IMDB_URL + '/search/movie', {
        params: {
          api_key: process.env.REACT_APP_IMDB_API_KEY,
          language: 'en-US',
          query: title,
          page: 1,
          include_adult: false,
        }
      });

      console.log(response);
      setSearchMovie(response.data.results);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search(navParams.title);
  }, []);
  return (
    <>
      <Paper square sx={{ minHeight: '100vh' }} >
        <ResponsiveAppBar />
        <Container maxWidth='lg' sx={{ marginTop: '20px' }}>
          <Typography fontSize={36} >Cari.. "{navParams.title}"</Typography>
          <Grid container spacing={2}>
            {loading ?
              'Loading'
              : searchedMovie.map(movie => {
                return (
                  <Grid item xs={2}>
                    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                      <Card sx={{
                        height: '250px',
                        backgroundImage: `url(${process.env.REACT_APP_IMDB_IMAGE_URL}/${movie.poster_path})`,
                        backgroundPositionX: 'center',
                        backgroundPositionY: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        "&:hover .hidden": {
                          display: "flex"
                        }
                      }}>
                        <Box className="hidden" sx={{
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          height: '100%',
                          display: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <Typography fontSize={16} fontWeight='bold' sx={{ textAlign: 'center' }}>{movie.title}</Typography>
                        </Box>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            }
          </Grid>
        </Container>
      </Paper>
    </>
  );
}

export default Search;