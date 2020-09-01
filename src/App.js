import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/michaellothbrook/desafio-conceitos-reactjs",
      techs: ["React", "Node.js"],
    });
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then((response) => {
      api.get('/repositories').then(response => {
        setRepositories(response.data);
      });
    });

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => {
          return (
            <li key={repositorie.id}>
              {repositorie.title}

              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          )
        }
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
