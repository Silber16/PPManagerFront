import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Projects from './components/Projects'
import CreateProject from './components/CreateProject'
import ProjectDetail from './components/ProjectDetail'
import EditProject from './components/EditProjectModal'

function App() {


  return (
    <BrowserRouter>

        <header>
            <h1>Title</h1>
        </header>

        <Routes>
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Project' element={<Projects />} />
            <Route path='/Project/:id' element={<ProjectDetail />} />
            <Route path='/Project/Create' element={<CreateProject />} />
            <Route path='/Project/Edit/:id' element={<EditProject />} />
            <Route path='/Project/Detail/:id' element={<ProjectDetail />} />
        </Routes>
        
    </BrowserRouter>
  )
}

export default App
