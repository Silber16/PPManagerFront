import axios from 'axios'
import { useEffect, useState } from 'react'
import Project from './Project'

export default function Projects() {

    const [projects, setProjects] = useState()

    useEffect(() => {
       
        axios.get(`https://localhost:7158/Project`, { withCredentials: true })
        .then(res => {
            if (res.data.length <= 0) {
                return "empty"
            }
            setProjects(res.data)
        })
        .catch(err => console.error(err + ' fetch error'))
    }
    , [])
    
    async function DeleteProject(projectId) {

        if (projectId != undefined) {
            axios.delete(`https://localhost:7158/Project/Delete/${projectId}`, {withCredentials:true})
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
    <section>    
         {projects ? (
            projects.map((project, index) => (
              <Project 
                project={project} 
                key={index}
                DeleteProject={DeleteProject}
              />
          ))) : (<p>You dont have projects already</p>)} 
    </section>
  )
}
