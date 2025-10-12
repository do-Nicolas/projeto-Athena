import React from 'react'
import "./Login.css";
const esquecerSenha = () => {
  return (
    <>
    <link href='https://cdn.boxicons.com/fonts/basic/boxicons.min.css' rel='stylesheet'>
    </link>
    <title>Redefinir Senha</title>

    <div class="wrapper_rdf">
    <div class="form-header">
            <div class="titles">
                <div class="titulo-redefinir">ATHƎNA</div> 
            </div>
    </div>
    <form action='#' class="redefinir-form" autocomplete="off">
        <div class = "input-box">
        <input> type="text"</input> class="input-field" id="rec-email" required
        <label htmlfor="rec-email" class="label">Email</label>
        <i class='bxr bx-envelope icon'></i> 
        </div>
        <div class ="form-cols">
            <div class="col-1">
            </div>
        </div>
       
        <button class="btn-submit" id="RedefinirBtn" onclick="loginFunction()">Redefinir senha </button>
               <script>
                document.getElementById("RedefinirBtn").addEventListener("click", function (e) {
                e.preventDefault()};
                window.location.href = "../Login_Athena/Login.html"; 
                );
                </script>
    </form>
    </div>
    <script src="Login.js"></script>
   
     
    
   </> )
   }
