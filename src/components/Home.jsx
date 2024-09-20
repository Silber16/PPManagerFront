import { useState } from "react"
import { Link } from "react-router-dom"
import Projects from "./Projects"

export default function Home() {

    const [isRegistered, setIsRegistered] = useState(false)
    setIsRegistered(true)

  return (
   <section>
       {isRegistered ? 
       (
            <>
                <header>
                    <h1>PPManager</h1>
                    <Link>User</Link>
                </header>
                <nav>
                    <Link>+INFO</Link>
                    <Link>CONTACT & SM</Link>
                </nav>
                <label >PROJECTS</label>
                <Projects />
                <Link to={"/Project/Create"} >Create a new project</Link>
            </>
       ) 
       : 
       (
            <>
              <header>
                <h1>PPManager</h1>
                </header>
                <nav>
                    <Link>+INFO</Link>
                    <Link>CONTACT & SM</Link>
                </nav>
                <div>
                    <p>Manage your projects in the simplest way</p>
                    <Link to={'/Register'}>Register/Login</Link>
                </div>
            </>
       )
       }
   </section>
  )
}
