import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Projects from "./Projects"

export default function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
      
        const userCookie = document.cookie.split('; ').find(row => row.startsWith('.AspNetCore.Identity.Application='));
        if (userCookie) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    }, [])
    

  return (
   <section>
       {isLoggedIn ? 
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
