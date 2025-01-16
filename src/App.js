import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataTable from './compenent/createrep';
import AddSong from './compenent/addsong';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route pour afficher la table des sons */}
          <Route path="/" element={<DataTable />} />
          {/* Route pour ajouter un nouveau son */}
          <Route path="/adds" element={<AddSong />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
