import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, [repositories]);

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
    await api.delete(`repositories/${id}`).then(() => {
      const repositorie = repositories.filter(repositorie => repositorie.id !== id);
      setRepositories(repositorie);
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
