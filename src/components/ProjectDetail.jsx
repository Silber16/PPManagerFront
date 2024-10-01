import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';
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
      <Link to={'/'} className='arrow-back'><span className="material-symbols-outlined">arrow_back</span></Link>
      {project 
      ? (
        <section className='projectDetail-sec'>
          <header className='projectDetail-sec__header'>
            <h3 className='projectDetail-sec__header--title'>{project.title}</h3>
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
        console.log("wait")
      )
      }
    </>
  )
}
