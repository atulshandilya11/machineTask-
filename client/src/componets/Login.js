// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    dispatch(setUser(formData));
    const apiUrl =
      process.env.REACT_APP_API_URL || 'http://localhost:3003';
    axios.post(`${apiUrl}/user/login`, formData).then((res) => {
      const token = res?.data?.token;

      dispatch(setToken(token));
      if (token) {
        navigate('/fetchNearUser');
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <Typography variant="h5" style={{ marginTop: '10px' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
