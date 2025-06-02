import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();


  //Recupere id 
  function idalbum(albumId) {
    console.log("ID de l'artiste sélectionné:", albumId);
    navigate(`/detailalbum/${albumId}`); 
    
  }
  useEffect(() => {
    async function fetchAlbums() {
      const response = await fetch(
        "http://localhost:8000/albums?page=1&limit=200"
      );
      const data = await response.json();
      setAlbums([...data].sort(() => Math.random() - 0.5));
    }

    fetchAlbums();
  }, []);

  return (
    <div>
      <nav className='nav1'>
        <ul className='styleul'>
        <li><a href="/home">Home</a></li>
        <li><a href="/listalbum">Albums</a></li>
        <li><a href="/listartist">Artists</a></li>
        <li><a href="/listgenres">Genres</a></li>
        <li><a href="/profil">Profil</a></li>
        <li><a href="/search">Search</a></li>
        </ul>
        </nav>
      <h1>Discover</h1>
      <div className="album-list" >
        {albums.map((album) => (
          <div key={album.id} className="album" onClick={() => idalbum(album.id)}>
            <h2>{album.name}</h2>
            <img src={album.cover} alt={album.name} />
            <p>Description: {album.description}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
