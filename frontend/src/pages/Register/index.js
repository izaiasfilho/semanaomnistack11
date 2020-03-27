import React, { useState} from 'react';

import api from '../../services/api'
import './style.css';

import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const[nome,setNome ] = useState('');
    const[email,setEmail ] = useState('');
    const[watzap,setWatzap ] = useState('');
    const[cidade,setCidade ] = useState('');

    const history = useHistory();

   async function handleRegister(e){
     e.preventDefault();
     const data={
         nome,
         email,
         watzap,
         cidade,
     };

     try{
        const response = await api.post('ongs',data);
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/');
     }catch(err){
        alert('Erro no cadastro, tente novamente.');
     }
     
   }

    return(
        <div className= "register-container">
            <div className= "content">
                <section>
                    <img src= {logoImg} alt= "Be the Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro entre na plataforma e ajude pessoas a encontrar casos da sua ONG</p>
                    
                    <Link className="back_link" to="/">
                    <FiArrowLeft size={16} color="#E02041" />
                    Não tenho registro
                    </Link>  
                </section>

   
                <form onSubmit={handleRegister}>
                   <input 
                   placeholder = "Nome da ONG"
                   value ={nome}
                   onChange={e => setNome(e.target.value)}
                   />

                   <input 
                   type="email"
                   placeholder= "E-mail"
                   value ={email}
                   onChange={e => setEmail(e.target.value)}
                   />
                   
                   <input 
                   placeholder = "WhatsApp"
                   value ={watzap}
                   onChange={e => setWatzap(e.target.value)}/>
                   
                   <input
                    placeholder = "Cidade"
                    value ={cidade}
                    onChange={e => setCidade(e.target.value)}
                    />

                   <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    
    );
}