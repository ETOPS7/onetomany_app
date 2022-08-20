import './styles/App.css';
import {
  Routes,
  Route,
} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import NavBar from './components/NavBar/NavBar';
import AllMyPresentation from './components/Presentations/AllMyPresentations';
import SignIn from './components/SignIn/SignIn';
import ShowCloud from './components/Demonstration/ShowCloud';
import AllTemplates from './components/Templates/AllTemplates';
import CreateCloudWords from './components/PresentationCreate/CreateCloudWords';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socketInit } from './Redux/actions/wsActions';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(socketInit());
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
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
