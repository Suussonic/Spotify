import React, { useState } from "react";
import data from "./music.json"; // Importez vos données JSON
import SearchBar from "./SearchBar"; // Importez la barre de recherche
import Popup from "./popup"; // Importez la popup
import "../css/createrep.css"; // Importez le fichier CSS

const DataTable = () => {
  const [query, setQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Fusionner albums et musiques hors albums
  const allItems = [
    ...data.albums.flatMap((album) =>
      album.sons ? [
        { ...album, type: "album" },
        ...album.sons.map((son) => ({
          ...son,
          albumName: album.nom,
          type: "song",
        })),
      ] : []
    ),
    ...data.sons.map((son) => ({ ...son, type: "song", albumName: null })),
  ];

  // Filtrer les éléments en fonction de la recherche
  const filteredItems = allItems.filter((item) => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      item.nom.toLowerCase().includes(lowerCaseQuery) ||
      (item.featuring &&
        item.featuring.some((feat) =>
          feat.toLowerCase().includes(lowerCaseQuery)
        )) ||
      (item.albumName && item.albumName.toLowerCase().includes(lowerCaseQuery))
    );
  });

  // Fonction pour ouvrir la popup
  const openPopup = (album) => {
    if (album.sons && album.sons.length > 0) {
      setSelectedAlbum(album);
    }
  };

  // Fonction pour fermer la popup
  const closePopup = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="data-table-container">
      {/* Barre de recherche */}
      <SearchBar onSearch={(q) => setQuery(q)} />

      <div className="table-wrapper">
        <table className="data-table">
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={index}
                className={item.type === "album" ? "album-row" : "song-row"}
                onClick={item.type === "album" ? () => openPopup(item) : undefined}
              >
                <td>
                  <img src={item.image} alt={item.nom} className="item-image" />
                </td>
                <td>
                  {item.nom}
                  <div className="item-details">
                    {item.type === "song" &&
                      item.featuring &&
                      item.featuring.length > 0 && (
                        <span>(feat. {item.featuring.join(", ")})</span>
                      )}
                    <span className="item-date">{item.dateDeCreation}</span>
                    {item.type === "song" && item.albumName && (
                      <span className="item-album">Album: {item.albumName}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup basique */}
      {selectedAlbum && <Popup album={selectedAlbum} onClose={closePopup} />}
    </div>
  );
};

export default DataTable;
