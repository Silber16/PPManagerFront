
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';

export default function Register() {

  const {register, handleSubmit} = useForm();

   async function Send(data) {
    console.log(data)
        await axios.post(`https://localhost:7158/Account/Register`, data) 
        console.log("register ok")
  }

  return (
        <section>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(Send)}>
                <label htmlFor="">Email</label>
                <input type="email" name="" id="" {...register("Email")}/>
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" {...register("Password")}/>
                <label htmlFor="">Confirm Password</label>
                <input type="password" name="" id="" {...register("ConfirmPassword")}/>
                <hr />
                <button type="submit">Register</button>
            </form>
            <p>You already registered? <Link to={`/Login`}>Login</Link></p>
        </section>  
  )
}
