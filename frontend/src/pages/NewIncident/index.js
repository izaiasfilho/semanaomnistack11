import React, {useState} from 'react';
import './style.css';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';



export default function NewIncident(){
    const [titlo, setTitlo] = useState('');
    const [ descricao, setDescricao] = useState('');
    const [ valor, setValor] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
  
   async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            titlo,
            descricao,
            valor
        };

  
        try{
          await api.post('incidents',data,{
              headers: {
                  Authorization: ongId
              }
          });
          history.push('/profile');
        }catch(err){
            alert('erro ao cadastrar caso');
        }
    }
  
    return (
        <div className= "new-incident-container">
            <div className= "contente">
                <section>
                    <img src= {logoImg} alt= "Be the Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver issso</p>
              
                    <Link className="back_link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    voltar para home
                    </Link>  
                </section>

                <form onSubmit = {handleNewIncident}>
                   <input
                    placeholder="Titulo do caso"
                    value= {titlo}
                    onChange={e => setTitlo(e.target.value)}/>

                   <textarea placeholder="Descrição"
                     value= {descricao}
                     onChange={e => setDescricao(e.target.value)}/>
  
                 <input placeholder="Valor em Reais"
                    value= {valor}
                    onChange={e => setValor(e.target.value)}/>
                   

                   <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>

    )
}