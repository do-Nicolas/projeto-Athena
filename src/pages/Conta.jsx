
import { useUser } from "@clerk/clerk-react";
import './Conta.css';
const Conta = () => {
  const { user } = useUser(); // ✔️ AGORA está dentro do componente

  if (!user) return <p>Carregando...</p>; // evita erro enquanto carrega

  return (
    <>
      <div className="main-content">
        <div>
          <div className="logo-avatar">  
            <img src={user.imageUrl} alt="Avatar" />
            </div>
        
          <div className="informations">
          <h2>{user.fullName}</h2>
          <div className="email"><p>{user.primaryEmailAddress?.emailAddress}</p></div>
          <p>Telefone: {user.primaryPhoneNumber?.phoneNumber || "Nenhum"}</p>

          <h3>Preferências</h3>
          <p>Tema: {user.publicMetadata.theme ?? "padrão"}</p>

          </div>
         
        </div>
      </div>
    </>
  )
}

export default Conta
