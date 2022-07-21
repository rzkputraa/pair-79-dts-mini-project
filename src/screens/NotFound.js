import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Typography align='center' fontSize={48}>404</Typography>
      <Typography align='center' fontSize={20}>Tidak menemukan yang kamu cari</Typography>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button variant='contained' color='error' onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    </Layout>
  );
}

export default NotFound;