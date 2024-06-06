import { useEffect, useState } from 'react'
import { FiltersComponent } from './components/Filters'
import { DataComponent } from './components/Data';
import { NavComponent } from './components/Navbar'
import './App.css'



function App() {

  return (
    <>
      <NavComponent />
      <DataComponent />
    </>
  );
}


export default App
