import axios from 'axios'
import { useEffect, useState } from 'react'
import Project from './Project'
import CreateModal from './CreateModal'

export default function Projects() {

    const [projects, setProjects] = useState()
    const [showCreateModal, setShowCreateModal] = useState(false)

    useEffect(() => {
       
        axios.get(`${import.meta.env.VITE_BACK_URI}/api/Project`, { withCredentials: true })
          .then(res => {
              if (res.data.length <= 0) {
                  return "empty"
              }
              setProjects(res.data)
          })
          .catch(err => console.error(err + ' fetch error'))
    }
    , [])
    
    
    async function Send(data) {
    
        try {
            await axios.post(`${import.meta.env.VITE_BACK_URI}/api/Project/Create`, data,{ withCredentials: true }) 
            window.location.reload()
        } catch (e) {
            console.error("error at create project: ",e)
        }

        return
    }

    function DeleteProject(projectId) {

        if (projectId != undefined) {
            axios.delete(`${import.meta.env.VITE_BACK_URI}/api/Project/Delete/${projectId}`, {withCredentials:true})
              .then(response => {

                console.log(response.status)
                if (response.status == 200) {
                  window.location.reload();
                } 
                
              })
              .catch(
                e => console.error(e)
              )
          }
          
      }
      
  return (
      <section 
        className='projects-sec'
        
      >    
      <label className="projects-sec__lbl">PROJECTS</label>
         <div className='projects-container'>
            {projects ? (
              projects.map((project, index) => (
                <Project 
                  project={project} 
                  key={index}
                  DeleteProject={DeleteProject}
                />
            ))) : (<p>You have no projects yet</p>)} 
         </div>
         <button onClick={() => setShowCreateModal(true)} className="projects-sec__createProject">Create Project</button>
                <CreateModal
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSave={Send}
                    modalType={"project"}
                />
      </section>
  )
}
