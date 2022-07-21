import { Container } from "@mui/material";

import { Link } from "react-router-dom";
function TrendingItem({ movie, height = "200px", showOverview = true }) {
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          color: "white",
          backgroundColor: "grey",
          height: height,
          backgroundImage: `url(${process.env.REACT_APP_IMDB_IMAGE_URL}/${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(19deg, rgba(0,0,0,1) 0%, rgba(28,28,192,0.03918662191439071) 88%)",
            display: "flex",
            justifyContent: "start",
            alignItems: "end",
          }}
        >
          <div
            style={{
              paddingBottom: 20,
              width: "50%",
            }}
          >
            <Container
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {movie.title}
            </Container>
            {showOverview && (
              <Container
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                {movie.overview.substring(0, 100)}...
              </Container>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TrendingItem;
