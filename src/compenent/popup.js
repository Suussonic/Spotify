import React from 'react';
import PropTypes from 'prop-types';
import '../css/Popup.css';

const Popup = ({ album, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{album.nom}</h2>
        <button onClick={onClose} className="close-button">Fermer</button>
        <ul>
          {album.sons.map((son, index) => (
            <li key={index}>
              {son.nom} - {son.duree}
              {son.featuring.length > 0 && (
                <span> (feat. {son.featuring.join(', ')})</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Popup.propTypes = {
  album: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
