import './styles/App.css';
import {
  Routes,
  Route,
} from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './components/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import AllMyPresentation from './components/Presentations/AllMyPresentations';
import SignIn from './components/SignIn/SignIn';
import ShowCloud from './components/Demonstration/ShowCloud';
import AllTemplates from './components/Templates/AllTemplates';
import CreateCloudWords from './components/PresentationCreate/CreateCloudWords';
import { socketInit } from './Redux/actions/wsActions';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { userCheck } from './Redux/actions/userActions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log('App.jsx -- user --->', user);
  useEffect(() => {
    if (user.id) {
      dispatch(socketInit());
    }
  }, [user]);

  useEffect(() => {
    dispatch(userCheck());
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/presents" element={<AllMyPresentation />} />
        <Route path="/templates" element={<AllTemplates />} />
        <Route path="/template/:id" element={<ShowCloud />} />
        <Route path="/template" element={<CreateCloudWords />} />
      </Routes>
    </div>
  );
}

export default App;
