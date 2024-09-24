import axios from "axios";
import { useState } from "react";
import CreateModal from "./CreateModal";
import { useForm } from "react-hook-form";

export default function Notes({projectNotes, projectId}) {
  
  const {register, handleSubmit, setValue} = useForm();

  const [notes, setNotes] = useState(projectNotes);
  const [showModal, setShowModal] = useState(false);
  
  const [editingNote, setEditingNote] = useState();
  const [isEditing, setIsEditing] = useState(false);

  async function handleCreateNote(note) {
    note = {
        ...note,
        projectId: projectId
    };
    
    axios.post("https://localhost:7158/Note/Create", note)
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                setNotes([...notes, note])
                window.location.reload();
            }
        }
            
        )
        .catch(e => console.error(e))
  }   

  async function edit(bool ,task)
  { 
      setIsEditing(bool)

      if (bool == false) {
          return
      }

      setEditingNote(task)

      setValue("Title", task.title);
      setValue("Desc", task.desc);
      setValue("Link", task.PriorityLevel);
  }
  async function send(data) {
    await axios.patch(`https://localhost:7158/Note/Edit/${editingNote.id}`, data) 
    .then(response => {
        if (response.status == 200) {
           setIsEditing(false)
           window.location.reload();
        }
    })
    .catch(e => console.error("send error: ", e))
}

  async function DeleteNote(noteId) {
    if (noteId != undefined) {
        axios.delete(`https://localhost:7158/Note/Delete/${noteId}`)
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
        <h4>Notes</h4>
        <button onClick={() => setShowModal(true)}>Create Note</button>
        <CreateModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleCreateNote}
            modalType={"note"}
        />
        <ul>
                {isEditing ? (
                  <div>
                      <h4>Edit Task</h4>
                      <form onSubmit={handleSubmit(send)}>
                          <label>
                              Title:
                          </label>
                          <input
                              type="text"
                              {...register("Title")}
                          />
      
                          <label>
                              Description:
                          </label>
                          <input
                              type="text"
                              {...register("Desc")}
                          />
      
                          <label>
                              Resources:
                          </label>
                          <input
                              type="url"
                              {...register("Link")}
                          />
      
                          <button type="submit">Save</button>
                          <button onClick={() => { edit(false, null)}}>Cancel</button>
                      </form>
                  </div>
                  ) : (
                  <ul>
                      {notes 
                          ? (notes.map(
                            note => (
                                <li key={note.id}>
                                    <h5>{note.title}</h5>
                                    <p>{note.desc}</p>
                                    <button onClick={() => edit(true, note)}>Edit note</button>
                                    <button onClick={() => DeleteNote(Number(note.id))}>Delete Note</button>
                                </li>
                        )))
                          : (console.error("notes is null"))
                      }
                  </ul>
                  )}
        </ul>
    </section>
  )
}
