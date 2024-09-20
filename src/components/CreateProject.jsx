
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';

export default function Register() {

  const {register, handleSubmit} = useForm();

   async function Send(data) {
    console.log(data)
        await axios.post(`https://localhost:7158/Project/Create`, data,{ withCredentials: true }) 
          .then(res => console.log(res))
          .catch(e => console.error(e))
        return
  }

  return (
        <section>
            <h2>Create Project</h2>
            <Link to={"/Project"}>Go back</Link>
            <form onSubmit={handleSubmit(Send)}>
                <label htmlFor="">Title</label>
                <input type="text" name="Title"  {...register("Title")}/>
                <label htmlFor="">Write a description</label>
                <input type="text" name="Desc"  {...register("Desc")}/>
                <hr />
                <button type="submit">Create</button>
            </form>
        </section>    
  )
}
