import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './style.css';
import api from '../../services/api';

export default function Profile(){
    const [incidents,setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');
    const history = useHistory();

useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, []);


     async function handleDeleteIncident(id){
         console.log('chamou o evento');
          try{
              await api.delete(`incidents/${id}`,{
                
                  headers: {
                      Authorization: ongId
                  }
              });
              
              setIncidents(incidents.filter(incident => incident.id !== id));
          }catch(err){
              alert('Erro ao deletar caso, tente novamente.')
          }
      }
      function handleLogout() {
        localStorage.clear();
    
        history.push("/");
      }

    return (
        <div className="profile-container">
            <header>
                <img src = {logoImg} alt ="Be the Hero" />
                  <span>Bem vindo, {ongNome}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
             <h1>Casos cadastrados</h1>

             <ul>
                 {incidents.map(incident => (
                     <li key={incident.id}>
                     <strong>CASO</strong>
                     <p>{incident.titlo}</p>

                     <strong>DESCRIÇÃO:</strong>
                     <p>{incident.descricao}</p>

                     <strong>VALOR</strong>
                     <p>{Intl.NumberFormat('pt-BR',{style: 'currency',currency:'BRL'}).format(incident.valor)}</p>


    <button type="button" onClick={() => {handleDeleteIncident(incident.id);
    }}
>
  <FiTrash2 size={20} color="#A8A8B3" />
</button>
                 </li>
                 ))}
             </ul>
        </div>
    );
}