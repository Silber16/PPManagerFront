import { useEffect, useState } from "react"

export default function AccessMessage() {

  const [hideMessage, setHideMessage] = useState(false)

  useEffect(() => {
     setTimeout(() => {
        setHideMessage(true)
     }, 10000);
  }, [])
  

  return (
    <div style={hideMessage ? {transform:'translateX(-120%)', opacity:'0'} : {}} className="accessMessage-container">
        <p className="accessMessage-container__text">La aplicación está en la fase final del desarrollo. Si el inicio de sesión no funciona en su navegador, desactive el bloqueo de cookies entre sitios. Algunos navegadores (como Safari o Chrome en modo incógnito) activan esta opción de forma predeterminada, lo cual afecta la autenticación.</p>
        <button className="accessMessage-container__closeBtn" onClick={() => setHideMessage(true)}>CERRAR</button>
    </div>
  )
}
