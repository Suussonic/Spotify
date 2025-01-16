import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/addsong.css";

const AddSong = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    dateDeCreation: "",
    duree: "",
    featuring: "",
    genre: "",
    artisteId: "",
    albumId: "",
    image: "",
    url: "",
  });
  const [albums, setAlbums] = useState([]);
  const [artistes, setArtistes] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setState) => {
      try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des ${endpoint} :`, error);
      }
    };

    fetchData("albums", setAlbums);
    fetchData("artistes", setArtistes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.artisteId || !formData.albumId) {
      alert("Veuillez sélectionner un artiste et un album.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/sons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          featuring: formData.featuring.split(",").map((feat) => feat.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      alert("Son ajouté avec succès !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de l'ajout du son :", error);
      alert("Erreur lors de l'ajout du son. Vérifiez la console pour plus de détails.");
    }
  };

  return (
    <div className="form-container">
      <h2>Ajouter un nouveau son</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de création :</label>
          <input
            type="date"
            name="dateDeCreation"
            value={formData.dateDeCreation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Durée :</label>
          <input
            type="text"
            name="duree"
            value={formData.duree}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Featuring (séparés par des virgules) :</label>
          <input
            type="text"
            name="featuring"
            value={formData.featuring}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Genre :</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Artiste :</label>
          <select
            name="artisteId"
            value={formData.artisteId}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionnez un artiste --</option>
            {artistes.map((artiste) => (
              <option key={artiste._id} value={artiste._id}>
                {artiste.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Album :</label>
          <select
            name="albumId"
            value={formData.albumId}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionnez un album --</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>URL de l'image :</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>URL du son :</label>
          <textarea
            name="url"
            value={formData.url}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <button type="submit" className="add-song-button">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddSong;
