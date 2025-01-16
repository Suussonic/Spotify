import React, { useState, useEffect } from "react";

const Player = ({ base64Audio }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (base64Audio) {
      try {
        // Décodage base64 et création de l'URL pour le fichier audio
        const audioBuffer = Uint8Array.from(atob(base64Audio), (char) =>
          char.charCodeAt(0)
        );
        const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Nettoyage après usage
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Erreur lors du décodage de l'audio :", error);
      }
    }
  }, [base64Audio]);

  if (!audioUrl) return null;

  return (
    <div className="audio-player">
      <audio controls autoPlay>
        <source src={audioUrl} type="audio/mpeg" />
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
    </div>
  );
};

export default Player;
