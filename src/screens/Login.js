import { VisibilityOff, Visibility, Google } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Link as ButtonLink,
  Container,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, getAuth } from 'firebase/auth';
import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';

function Login() {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleVisibility = () => {
    setVisible(!visible);
  }

  const handleLogin = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      setError('Please fill all fields');
      return;
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      navigate('/');
    }).catch(error => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      setError(errorMessage);
    });
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
            <Typography sx={{ fontSize: 18 }} align="center" fontWeight={600} color="text.secondary" gutterBottom>
              Login
            </Typography>
            <TextField
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              variant="outlined"
              margin='dense'
              size='medium' />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
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
            {error && <Typography color="error">{error}</Typography>}
            <Button
              sx={{ width: '100%', marginTop: 3 }}
              fullWidth
              variant="contained"
              color="error"
              size='large'
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
            <Typography sx={{ fontSize: 14, marginTop: 2, marginBottom: 2 }} align="center" color="text.secondary" gutterBottom>
              atau masuk dengan
            </Typography>
            <Button
              onClick={handleLoginWithGoogle}
              fullWidth
              variant="outlined"
              color="primary"
              size='large'
              startIcon={<Google />}
              sx={{ textTransform: 'capitalize' }}
            >
              Google
            </Button>

            <Typography sx={{ fontSize: 14, marginTop: 2, marginBottom: 2 }} align="center" color="text.secondary" gutterBottom>
              Belum punya akun? <Link to='/register'><ButtonLink>Buat akun</ButtonLink></Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Paper>
  );
}

export default Login;