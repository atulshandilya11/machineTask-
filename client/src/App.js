import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './componets/Register';
import Login from './componets/Login';
import FetchNearUser from './componets/FetchNearUser';
import UpdateUser from './componets/UpdateUser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fetchNearUser" element={<FetchNearUser />} />
          <Route
            path="/updateUser/:userId"
            element={<UpdateUser />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
