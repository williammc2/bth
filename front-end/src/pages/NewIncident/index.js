import React,{useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';
import './style.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'
export default function NewIncident(){

    const [titulo, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [value, setValue] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();


    async function handleNewIncident(e){
        e.preventDefault();

        const data ={
            titulo,
            description,
            value,
        };

        try {
            await api.post('incidents', data,{
                headers: {Authorization: ongId,
                }
            })

            history.push('/profile');

        } catch (error) {
           alert('Erro ao cadastrar  caso, tente novamente') 
        }
    }

    return (

        <div className="new-indicent-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"></img>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                    Voltar para home!</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    
                    <input value={titulo} onChange={e => setTitle(e.target.value)} placeholder="Titulo do caso"></input>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"></textarea>
                    <input value={value} onChange={e => setValue(e.target.value)}  placeholder="Valor em reais"></input>

                    
                    <button  className="button" type="submit">Cadastrar</button>
                
                </form>
            </div>

        </div>


    );
}