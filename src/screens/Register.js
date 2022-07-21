import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button, Card, CardContent, Container, IconButton, InputAdornment, Paper, TextField, Typography,
  Link as ButtonLink,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { InfoRounded } from '@mui/icons-material';
import { useNavigate, Link } from "react-router-dom";


export default function Register() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVisibility = () => {
    setVisible(!visible);
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (email === "" || password === "" || passwordConfirm === "") {
      setError("Please fill all fields");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Paper sx={{ height: '100vh', paddingTop: 20 }} square>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth='xs'>
        <Card elevation={2} sx={{ borderRadius: 3, padding: 2 }}>
          <CardContent>
            <Typography>Daftarkan emailmu untuk memulai</Typography>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              fullWidth
              label="Email"
              variant="outlined"
              margin='dense'
              size='medium' />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              fullWidth
              label="Password"
              variant="outlined"
              margin='dense'
              type={visible ? 'text' : 'password'}
              size='medium'
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleVisibility}
                      onMouseDown={handleVisibility}
                      edge="end"
                    >
                      {visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={(e) => setPasswordConfirm(e.target.value)}
              id="confirm_password"
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin='dense'
              type={visible ? 'text' : 'password'}
              size='medium'
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleVisibility}
                      onMouseDown={handleVisibility}
                      edge="end"
                    >
                      {visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error" sx={{ display: 'flex' }}><InfoRounded /> {error}</Typography>}

            <Button
              onClick={handleSubmit}
              fullWidth
              disabled={loading}
              variant="contained"
              color="error"
              size='large'
              sx={{ textTransform: 'capitalize', marginTop: 3 }}
            >
              {loading ? "Loading..." : "Daftar"}
            </Button>
            <Typography mt={2} mb={2} fontSize={14} align="center" color="text.secondary" gutterBottom>
              Sudah punya akun? <Link to='/login'><ButtonLink>Masuk</ButtonLink></Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Paper>
  );
}