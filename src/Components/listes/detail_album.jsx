import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react'
import { useParams } from "react-router";
import './stye.css';


export default function lists_artits(){
const [albums,setAlbums]=useState();
 const [playingTrack, setPlayingTrack] = useState(null);
const {id}=useParams();

//Declaration des variables
useEffect(() => {
        //Afficher les genres
       fetch(`http://localhost:8000/albums/${id}`)
        .then(reponse=>reponse.json())
        .then(data=>{
          //  console.log(data)
            setAlbums([data])
            setPlayingTrack([data]);
            ;}
        )}
);
//async function track(){
    //const response = await fetch(`http://localhost:8000/albums/${id}`);
    //const data = await response.json();
    //console.log("track récupérées:", data);
        //setAlbums([data]);
       // setPlayingTrack([data]);
//}

    return (
        <div className="A">
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
        <Container>
            
            <h1> Information de l'album 💿</h1>
            <div className='description'>
            {albums?.map((album) => (
        <div key={albums.id} className='dispo'>
            
            <div className='albumstyle' >
            <Card.Img src={album.album.cover} />
            <div className='titreAl'>Nom album : {album.album.name}
            </div>
            < div className='textAl' style={{ width: '50rem' }}>Bio : {album.album.description}</div>
            </div>
        </div>
        
        ))}
        </div>
</Container>

        <div className='lecteurA'>
            
            {albums?.map((album, i) => (
                <div  className='lecteurA'key={i} >
                    <h1>Tracks</h1>
                    <Card.Body>
                                {album.tracks.map((track, i) => (
                                    <li key={i} onClick={() => setPlayingTrack(play)}>
                                        🔊 {track.name}
                                        <audio controls >
                                            <source src={track.mp3} type="audio/mpeg" />
                                        </audio>
                                    </li>
                                    
                                ))}
                    </Card.Body>
                </div>
            ))}
        </div>
        
        </div>
)}

        
