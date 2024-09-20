import { useState } from "react";
import CreateModal from "./CreateModal";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Tasks({projectTasks, projectId}) {

    const {register, handleSubmit, setValue} = useForm();

    const [tasks, setTasks] = useState(projectTasks);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const firstThree = true;
    const firstThreeTask = tasks.slice(0,3);
    const tasksToMap = firstThree ? firstThreeTask : tasks;

    async function edit(bool ,task)
        { 
            setIsEditing(bool)

            if (bool == false) {
                return
            }

            setEditingTask(task)

            setValue("Title", task.title);
            setValue("Desc", task.desc);
            setValue("PriorityLevel", task.priorityLevel);
        }

    async function handleCreateTask(task) {
        console.log(task)
        task = {
            ...task,
            projectId: projectId
        };
        
        axios.post("https://localhost:7158/Tasks/Create", task)
            .then(
                setTasks([...tasks, task])
            )
            .catch(e => console.error(e))
    }

    async function send(data) {
        await axios.patch(`https://localhost:7158/Tasks/Edit/${editingTask.id}`, data) 
        .then(response => {
            if (response.status == 200) {
                setIsEditing(false)
                window.location.reload()
            }
        })
        .catch(e => console.error(e))
    }

    async function deleteTask(taskId) {
        if (taskId != undefined) {
            axios.delete(`https://localhost:7158/Tasks/Delete/${taskId}`)
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
    
    const priorityLevelPrint = (priority) => {
        switch (priority) {
            case 1:
                return "Low";
            case 2:
                return "Medium";
            case 3:
                return "High";
        
            default:
                "Value is not on the range";
        }
    }

  return (
    <section>
        <h4>Tasks</h4>
        <button onClick={() => setShowCreateModal(true)}>Create Task</button>
        <CreateModal
            show={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreateTask}
            modalType={"task"}
        />
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
                        Priority:
                    </label>
                    <input
                        type="number"
                        {...register("PriorityLevel")}
                    />

                    <button type="submit" >Save</button>
                    <button onClick={() => { edit(false, null)}}>Cancel</button>
                </form>
            </div>
            ) : (
            <ul>
                {tasks 
                    ? (tasksToMap.map(task => (
                        <li key={task.id}>
                            <h5>{task.title}</h5>
                            <p> Description: {task.desc}</p>
                            <p>Priority: {priorityLevelPrint(task.priorityLevel)}</p>
                            <p>Date Limit: {task.dateLimit}</p>
                            <button onClick={() => edit(true, task)}>Edit Task</button>
                            <button onClick={() => deleteTask(Number(task.id))}>Delete Task</button>
                        </li>
                )))
                    : (console.error("Tasks is null"))
                }
            </ul>
            )}
    </section>
  )
}
