import React from 'react';
import ApiForm from './components/ApiForm';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

function App() {
  return (
    <div className="app-main">
      <h1>API Hunter</h1>
      <ApiForm />
      <ResponseDisplay />
    </div>
  );
}

export default App;