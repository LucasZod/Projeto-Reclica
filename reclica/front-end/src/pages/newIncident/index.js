import React, { useState } from "react";
import './style.css';
import logoImg from "../../assets/logo.svg";
import {Link, useHistory} from "react-router-dom";
import {FiArrowLeft} from 'react-icons/fi';
import api from "../../services/api";

export default function Incidents() {

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    
        async function handleCadIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try{
            await api.post('incidents', data,{
                headers:{
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        }catch (err) {
            alert("Não foi possível cadastrar o caso!");
        }

    }

    return(
        <div className="new-incident-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleCadIncident}>

                    <input placeholder="Titulo do caso"
                           value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                    />

                    <input placeholder="Valor em reais"
                            value={value}
                           onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}