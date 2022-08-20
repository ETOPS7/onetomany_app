import './styles/App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socketInit } from './Redux/actions/wsActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(socketInit());
  }, []);

  return (
    <div className="App">
      <h1>Welcome to #ONETOMANY!</h1>
    </div>
  );
}

export default App;
