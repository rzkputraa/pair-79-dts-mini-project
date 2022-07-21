import { Box } from "@mui/material";
import Carousel from "../components/Trending";
import Discover from "../components/Discover";

import Layout from "./Layout";
import InTheaters from "../components/InTheaters";

function Home() {
  return (
    <Layout>
      <InTheaters />
      <Carousel />
      <Box sx={{ marginTop: "20px" }} />
      <Discover />
    </Layout>
  );
}

export default Home;
