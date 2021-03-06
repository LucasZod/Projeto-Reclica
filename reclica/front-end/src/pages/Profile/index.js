import React, { useState, useEffect } from "react";
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from "../../services/api";
export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    async function handleDelete(id){

        try{
            await api.delete(`incidents/${id}`,
                {
                    headers:{
                        Authorization: ongId,
                    }
                });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err) {
            alert('Erro ao tentar excluir');
        }
    }

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    },[ongId]);

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return(
      <div className="profile-container">
          <header>
              <img src={logoImg} alt="Be the hero" />
              <span>Bem vinda, {ongName}</span>

              <Link className="button" to="/incidents/new">Cadastrar</Link>
              <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#E02041"/>
              </button>
          </header>

          <h1>Casos cadastrados</h1>
          <ul>
              {incidents.map(incident => (
                  <li key={incident.id}>
                      <strong>CASO:</strong>
                      <p>{incident.title}</p>

                      <strong>DESCRIÇÃO:</strong>
                      <p>{incident.description}</p>

                      <strong>VALOR:</strong>
                      <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                      <button onClick={() => handleDelete(incident.id)} type="button">
                          <FiTrash2 size={20} color="#a8a8b3"/>
                      </button>
                  </li>

              ))}
          </ul>
      </div>
    );

}