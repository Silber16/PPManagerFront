import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Tasks from './Tasks';
import Notes from './Notes';


export default function ProjectDetail() {

    const [project, setProject] = useState()
    const {id} = useParams()
    useEffect(() => {

        axios.get(`https://localhost:7158/Project/Detail/${id}`, {withCredentials:true})
        .then(res => {
          
            if (res.data != null) {
               setProject(res.data)
            }
          })
        .catch(
            e => console.error("errores: ", e)
          )

    }, [id])
    
  return (
    <>
      {project 
      ? (
        <section>
          <header>
            <h3>{project.title}</h3>
          </header>
          <Tasks 
            projectTasks={project.tasks}
            projectId={Number(id)}
          />
          <Notes
            projectNotes={project.notes}
            projectId={Number(id)}
          />
        </section>
      )
      : (
        console.log(project)
      )
      }
    </>
  )
}
