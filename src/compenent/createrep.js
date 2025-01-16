import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import "../css/createrep.css"; // Importez le fichier CSS

const DataTable = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  // Charger les données depuis l'API
  useEffect(() => {
    fetch("http://localhost:3000/api/sons")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Erreur lors de la récupération des sons :", error));
  }, []);

  // Fonction pour rediriger vers la page d'ajout de son
  const handleAddSong = () => {
    navigate("/adds");
  };

  return (
    <div className="data-table-container">
      <div className="top-bar">
        {/* Barre de recherche */}
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher des sons..."
        />
        {/* Bouton Ajouter un son */}
        <button className="add-song-button" onClick={handleAddSong}>
          Ajouter un son
        </button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <tbody>
            {songs.map((song) => (
              <tr key={song._id} className="song-row">
                <td>
                  <img
                    src={song.image}
                    alt={song.nom}
                    className="item-image"
                  />
                </td>
                <td>
                  {song.nom}
                  <div className="item-details">
                    {song.featuring && song.featuring.length > 0 && (
                      <span>(feat. {song.featuring.join(", ")})</span>
                    )}
                    <span className="item-date">{song.dateDeCreation}</span>
                    <span className="item-album">Genre: {song.genre}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
