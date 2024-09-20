
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

export default function Login() {

  const {register, handleSubmit} = useForm();

   async function Send(data) {
    console.log(data)
        await axios.post(`https://localhost:7158/Account/Login`, data, {withCredentials: true}) 
        .then(res => console.log(res))
      }

  return (
        <section>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(Send)}>
                <label htmlFor="">Email</label>
                <input type="email" name="Email"{...register("Email")}/>
                <label htmlFor="">Password</label>
                <input type="password" name="Password" {...register("Password")}/>
                <label htmlFor="">RememberMe</label>
                <input type="checkbox" name="RememberMe" {...register("RememberMe")}/>
                <hr />
                <button type="submit">Login</button>
            </form>
            <p>You are not registered? <Link to={`/Register`}>Register</Link></p>
        </section>  
  )
}
