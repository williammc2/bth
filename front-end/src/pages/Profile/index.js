import React, {useEffect, useState} from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi'
import {Link,useHistory} from 'react-router-dom';
import './style.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'


export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect(()=> {
    api.get('profile', {
            headers: {
                Authorization: ongId,
            }   
        }).then(response =>{
            setIncidents(response.data);
            
        })
    }, [ongId]);
    
    async function handleDeleteIncident(id){

        try {
            await api.delete(`incidents/${id}`, {headers:{ Authorization: ongId,
                }
            });
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
        //Atualiza o incidents para remover o caso que foi exlcuir sem precisar dar refresh 
        setIncidents(incidents.filter(incident => incident.id !== id))
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, {ongName}</span>

               <Link className="button" to='/incidents/new'>Cadastrar Novo Caso</Link>
               <button type="button" onClick={handleLogout}>
                   <FiPower size={18} color="#e02041"></FiPower>
               </button>
            </header>

            <h1>Casos Cadastrados</h1>
            
            <ul>
                {incidents.map(incident =>(
                <li key={incident.id}>
                <strong>Caso:</strong>
                <p>{incident.title}</p>
                
                <strong>Descrição:</strong>
                <p>{incident.description}</p>
                
                <strong>Valor:</strong>
                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>
                
                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                </button>
                </li>
                ))}
            </ul>
            
        </div>
    );
}