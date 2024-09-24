import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditProjectModal({show, onClose, id}) {

    const {register, handleSubmit} = useForm();

    async function Send(data) {
         await axios.patch(`https://localhost:7158/Project/Edit/${id}`, data, {withCredentials:true}) 
            .then(response => {
                if (response.status == 200) {
                    window.location.reload();
                }
            })
            .catch(e => console.error(e))
         return
   }

   if (!show) {
      return null
   }
 
   return (
         <section>
             <h2>Edit Project</h2>
             <button onClick={onClose}>Close</button>
             <form onSubmit={handleSubmit(Send)}>
                 <label htmlFor="">Title</label>
                 <input type="text" name="Title" {...register("Title")}/>
                 <label htmlFor="">Edit description</label>
                 <input type="text" name="Desc" {...register("Desc")}/>
                 <hr />
                 <button type="submit">Confirm</button>
             </form>
         </section>    
   )
}
