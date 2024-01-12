import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log(userId);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    mobile: '',
    zipCode: '',
    lat: '',
    long: '',
    profilePic: null,
  });

  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_API_URL || 'http://localhost:3003';

    axios
      .get(`${apiUrl}/user/${userId}`)
      .then((response) => {
        const user = response.data;
        setUserData({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          mobile: user.mobile,
          zipCode: user.zipCode,
          lat: user.lat,
          long: user.long,
          profilePic: user.profilePic,
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setUserData({ ...userData, profilePic: e.target.files[0] });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpload = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });

      const apiUrl =
        process.env.REACT_APP_API_URL || 'http://localhost:3003';
      const response = await axios.put(
        `${apiUrl}/user/${userId}/update`,
        formDataForUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedUser = response.data;
      //   dispatch(setUser(updatedUser));

      console.log('User updated successfully:', updatedUser);
      navigate('/fetchNearUser');
    } catch (error) {
      console.error('Error updating user:', error);
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
          Update User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Avatar
            src={userData.profilePic}
            alt={userData.name}
            sx={{ marginRight: '10px' }}
          />
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={userData.name}
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
            value={userData.email}
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
            value={userData.password}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            variant="outlined"
            margin="normal"
            fullWidth
            value={userData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Mobile"
            name="mobile"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={userData.mobile}
            onChange={handleChange}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={userData.zipCode}
            onChange={handleChange}
          />
          <TextField
            label="Latitude"
            name="lat"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={userData.lat}
            onChange={handleChange}
          />
          <TextField
            label="Longitude"
            name="long"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={userData.long}
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
            value={userData.profilePic}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UpdateUser;
