import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react'
import './stye.css';

import { useNavigate, useParams } from "react-router-dom";

export default function lists_genres(){
    //Declaration des const
    const [searchInput, setSearchInput] = useState('');
    const [albums, setAlbums] = useState([]);
    const [genre, setgenre] = useState([]);
    const [playingTrack, setPlayingTrack] = useState(null);
    const {id}=useParams();
    const navigate = useNavigate();

    
//Recupere id 
function idalbum(albumId) {
    console.log("ID de l'artiste sélectionné:", albumId);
    navigate(`/detailalbum/${albumId}`); 
    
  }
    async function search(){
        console.log("Search for: " + searchInput); 
        //Afficher les genres
        const response = await fetch(`http://localhost:8000/genres/${searchInput}`);
        const data = await response.json();
        console.log("GENRErécupérées:", data);

        //recuperer Id du genre 
        const Idgenre=data;
        const IdgenreAlbum=Idgenre.albums;
        console.log("Id du genre:",Idgenre.genre)
        //console.log("Nom du genre:",Idgenre.genre.name)
        console.log("Albums du genre:",Idgenre.albums)
        setgenre([data.genre]); // pouvoir utiliser .map
        

        //Album avec ID REVOIR POUR AVOIR ACCES A 1 ID
        const AlbumGenre=await fetch(`http://localhost:8000/genres/${id}`)
        .then(response => response.json())
        .then(data => {
        console.log("Albums ti :", data);
        //setAlbums(data);

        const idgenee=data.albums
        console.log("Id du genretoto:",idgenee)
        


            
        fetch(`http://localhost:8000/albums/${idgenee}`)
        .then(response => response.json())
        .then(data => {
        console.log("Albumstoto  :", data);
        setAlbums([data]);
    })
    });

    
}
    return(
        <div className='App'>
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
                        <Button className='Button' onClick={search}>Artist</Button>
            </Container>
            <Container>
                        <h1>Genre</h1>
                        <Row>
                    {albums?.map((album, i) => (
                        <Card key={i} style={{ width: '18rem', margin: '10px' }} onClick={() => setAlbums(album)}>
                        <Card.Body key={album.id} onClick={() => idalbum(album.id)}>
                            <Card.Img variant="top"  className='image' src={album.album.cover_small} />
                            <Card.Title>{album.album.name}</Card.Title>
                        </Card.Body>
                        </Card>
                            ))}
                        </Row>

            </Container>

        </div>
    )
}

//1. Afficher les genres 
//2. Afficher les ablums liés au genre
//3.faire la redirection 