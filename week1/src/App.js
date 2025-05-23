import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormComponent from './components/FormComponent';
import SuccessPage from './components/success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/success" element={<SuccessPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
