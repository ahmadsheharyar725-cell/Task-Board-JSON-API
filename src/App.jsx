import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MyNavBar from './Components/MyNavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Team from './Components/Team'
import AssignTasks from './Components/AssignTasks'
import Task from './Components/Task'



function App() {

  return (
    <>
     <MyNavBar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/team' element={<Team/>}/>
      <Route path='/assign-task' element={<AssignTasks/>}/>
   <Route path='/tasks' element={<Task/>}/>
     </Routes>
    </>
  )
}

export default App
