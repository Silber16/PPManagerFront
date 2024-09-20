
import { Link } from "react-router-dom";
import EditProjectModal from "./EditProjectModal";
import { useState } from "react";

export default function Project({project, DeleteProject}) {

    const [showModal, setShowModal] = useState(false)

    const onClose = () => setShowModal(false);
    const onShow = () => setShowModal(true);

  return (
    <>
      {project 
      ?(
          <div>
          <h3>{project.title}</h3>
          <p>{project.desc}</p>
          <Link to={`/Project/Detail/${project.id}`}>Acces</Link>
          <button onClick={onShow}>Edit Project</button>
          <button onClick={() => DeleteProject(project.id)}>Delete Project</button>
          </div>
       )
      : (console.log("project is null"))
      }
      <EditProjectModal 
        show={showModal}
        onClose={onClose}
        id={project.id}
      ></EditProjectModal>
      <hr />
    </>
  )
}
