
import './App.css';
import React, { useContext, useState } from 'react';
import Entry from './pages/Entry';
import Create_Join_Table from './pages/Create_Join_Table';
import Table_Setting from './pages/Table_Setting';
import Table from './pages/Table';
import Game_Table from './pages/Game_Table';
import { Context } from './helpers/Contexts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/create_join_table" element={<Create_Join_Table />} />
      <Route path="/table_setting" element={<Table_Setting />} />
      <Route path="/table" element={<Table />} />
      <Route path="/game_table" element={<Game_Table />} />
    </Routes>
  </Router>
  );
}

export default App;
                 