import React from 'react'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import TaskCreation from './components/TaskCreation/TaskCreation'
import Layout from './pages/Layout'
import LoginPage from './pages/Login'
import Signup from './pages/Signup'
import ViewTask from './pages/ViewTask'
const App = () => {
  return (

    <div className="h-screen w-full bg-[#020e1e]  px-1 ">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<Signup />} />
        {/* Dashboard Layout with Sidebar */}
        <Route path="/home" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="task-create" element={<TaskCreation />} />
          <Route path="task-view" element={<ViewTask />} />
        {/* <Route path="leaderboard" element={<Leaderboard />} /> */}
        </Route>
      </Routes>
    </div>

  )
}

export default App