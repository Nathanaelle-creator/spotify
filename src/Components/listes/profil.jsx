import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profil.css";

const Profil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/user/1")
      .then(response => setUser(response.data))
      .catch(error => console.error("Erreur de récupération :", error));
  }, []);

  return (
    <div className="spotify-profile-container">
      <div className="back-home">
        
      </div>
    <h1>Profil</h1>    
    <nav>
      <div>
      </div>
        <ul>
          <li><a href="/home">Home</a></li>
        </ul>
      </nav>
        
    


      <div className="cover-photo">
        <img src="src/Assets/chatpo.jpeg" alt="Cover" className="cover-img" />
      </div>

      <div className="profile-header">
        <img src="src/Assets/gto_anime1.jpg" alt="Avatar" className="avatar" />

        <h1 className="username">{user ? `${user.firstname} ${user.lastname} (@${user.username})` : ""}</h1>


      </div>

      <div className="playlist-section">
        <h2>Playlists Favoris</h2>
        <div className="playlist-grid">
          <div className="playlist-card">
            <img src="https://via.placeholder.com/150" alt="Playlist cover" className="playlist-img" />
            <p className="playlist-nom">Chill Vibes</p>
          </div>
          <div className="playlist-card">
            <img src="https://via.placeholder.com/150" alt="Playlist cover" className="playlist-img" />
            <p className="playlist-name">Workout Hits</p>
            <p className="playlist-name">Rock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
