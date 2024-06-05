import { useState } from 'react'
import { FiltersComponent } from './components/Filters'
import { MapComponent } from './components/Map'
import { GraphsComponent } from './components/Graphs'

import './App.css'

function App() {

  return (
    <>
      <FiltersComponent />
      <MapComponent />
      <GraphsComponent />
      <h1>hola</h1>
    </>
  )
}

export default App
