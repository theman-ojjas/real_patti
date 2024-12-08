
import './App.css';
import React, { useContext, useState } from 'react';
import Entry from './pages/Entry';
import Create_Join_Table from './pages/Create_Join_Table';
import Table_Setting from './pages/Table_Setting';
import Table from './pages/Table';
import { Context } from './helpers/Contexts';

function App() {
  // const {pageState,setPageState}=useState("entry");
  return (    
    <div className="App">  
       <Table/>
    </div>
  );
}

export default App;
                 