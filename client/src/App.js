import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './components/SignUp/SignUp';
import MyNavBar from './components/NavBar/MyNavBar';
import AllMyPresentation from './components/Presentations/AllMyPresentations';
import SignIn from './components/SignIn/SignIn';
import ShowCloud from './components/Demonstration/ShowCloud';
import AllTemplates from './components/Templates/AllTemplates';
import CreateCloudWords from './components/PresentationCreate/CreateCloudWords';
import { socketInit } from './Redux/actions/wsActions';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { userCheck } from './Redux/actions/userActions';
import FromAnswerCloud from './components/FormAnswer/FromAnswerCloud';
import './styles/index.css';
import AuthUser from './components/RequireAuth/AuthUser';
import AboutPage from './components/AboutPage/AboutPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
      {user.id && <MyNavBar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/presents" element={<AllMyPresentation />} />
        <Route path="/templates" element={<AllTemplates />} />
        <Route path="/:id/:template/:pincode" element={<FromAnswerCloud />} />
        <Route
          path="/:id/:pincode"
          element={(
            <AuthUser>
              <ShowCloud />
            </AuthUser>
          )}
        />
        <Route
          path="/:template"
          element={(
            <AuthUser>
              <CreateCloudWords />
            </AuthUser>
          )}
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
