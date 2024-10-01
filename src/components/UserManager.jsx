import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function UserManager() {

    const [userData, setUserData] = useState()

    useEffect(() => {
      axios.get('https://localhost:7158/Account/GetUserInfo', {withCredentials:true})
        .then(res => {
            if (res != null) {
                setUserData(res.data)
            }
            }
        )
        .catch(e => console.error("error at GET req. ", e))
    }, [])
    
    async function LogOut() {
        axios.post('https://localhost:7158/Account/LogOut', null, {withCredentials:true})
          .then(res => {
              res.status == 200 && console.log("logged out")
              window.location.href = "/";
            })
          .catch(e => console.error("log out error: ", e))
    }

  return (
    <section className="userManager-sec">
        <label className="userManager-sec__lbl">Account Info</label>
        <Link className="arrow-back" to={'/'}><span className="material-symbols-outlined">arrow_back</span></Link>
        {userData && (<p className="userManager-sec__data"><b>Username/Email: </b>{userData.userName}</p>)}
        <button className="userManager-sec__logOut" onClick={() => {LogOut()}}>Log out</button>
    </section>
  )
}