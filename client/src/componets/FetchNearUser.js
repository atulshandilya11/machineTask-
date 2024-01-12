import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FetchNearUser() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [users, setUsers] = useState([]);
  const [fetchNearUser, setFetchNearUser] = useState(null);

  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_API_URL || 'http://localhost:3003';
    axios
      .get(`${apiUrl}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFetchUser = (user) => {
    const apiUrl =
      process.env.REACT_APP_API_URL || 'http://localhost:3003';

    axios
      .get(`${apiUrl}/user/${user._id}/nearest`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setFetchNearUser(response.data);
        console.log('Nearest Users:', response.data);
      })
      .catch((error) => console.error(error));
  };
  const handleUpdateUser = (user) => {
    navigate(`/updateUser/${user._id}`);
  };
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        All User
      </Typography>

      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Avatar
              src={user.profilePic}
              alt={user.name}
              sx={{ marginRight: '10px' }}
            />
            <Typography sx={{ flexGrow: 1 }}>
              {user.name} - {user.email}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleFetchUser(user)}
            >
              Fetch Near 3 Users
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleUpdateUser(user)}
            >
              Update User
            </Button>
          </ListItem>
        ))}
      </List>

      {fetchNearUser && (
        <div>
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            Nearest Users:
          </Typography>
          <List>
            {fetchNearUser.map((user) => (
              <ListItem
                key={user._id}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Avatar
                  src={user.profilePic}
                  alt={user.name}
                  sx={{ marginRight: '10px' }}
                />
                <Typography>
                  {user.name} - {user.email}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
}

export default FetchNearUser;
