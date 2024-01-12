import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    mobile: '',
    zipCode: '',
    lat: '',
    long: '',
    profilePic: null,
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });
      const apiUrl =
        process.env.REACT_APP_API_URL || 'http://localhost:3003';
      const response = await axios.post(
        `${apiUrl}/user/register`,
        formDataForUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const registeredUser = response.data;
      dispatch(setUser(registeredUser));

      console.log('Registration success:', registeredUser);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
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
          <TextField
            label="Phone"
            name="phone"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Mobile"
            name="mobile"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Latitude"
            name="lat"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            label="Longitude"
            name="long"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            type="file"
            accept="image/*"
            label="Profile Pic"
            name="profilePic"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
