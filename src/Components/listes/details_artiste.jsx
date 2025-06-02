import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react'
//import { useParams } from "react-router";
import { useNavigate, useParams } from "react-router-dom";


export default function lists_artits(){
const [artists, setArtists] = useState([]);
const [albums,setAlbums]=useState();
 const navigate = useNavigate();
  const [playingTrack, setPlayingTrack] = useState(null);

const {id}=useParams();

function idalbum(albumId) {
    console.log("ID de l'album sélectionné:", albumId);
    navigate(`/detailalbum/${albumId}`); 
    
  }

//Declaration des variables
useEffect(() => {
        //
        fetch(`http://localhost:8000/artists/${id}`)
        .then(reponse=>reponse.json())
        .then(data=>{
            //console.log(data)
            setArtists([data])
            ;}
        )}
);

useEffect(()=>{
    fetch(`http://localhost:8000/albums/artist/${id}`)
        .then(reponse=>reponse.json())
        .then(data=>{
            //console.log(data)
            setAlbums(data);
        setPlayingTrack([data]);
            ;}
        )
})
//async function musique(){
    //const response = await fetch(`http://localhost:8000/albums/artist/${id}`);
    //const data = await response.json();
    //console.log("album récupérées:", data);
       // setAlbums(data);
        //setPlayingTrack([data]);
//}
    return (
        <div className="App">
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
            <h1> Information de l'artiste</h1>
            <div className='description'>
            {artists.map((artist) => (
        <Card key={artist.id} className="m-2" >
            <Card.Img variant="top" src={artist.cover_small} />
            <div className="albumstyle">
            <Card.Img variant="top"  className='image'  src={artist.photo} />
            <Card.Title className='titre'>Nom artiste : {artist.name}</Card.Title>
            <Card.Text>Bio : {artist.bio}</Card.Text>
            </div>
        </Card>
        ))}
        </div>
        <Row>
                    <h1>Albums</h1>
                    {albums?.map((album, i) => (
                        <Card key={i} >
                            <Card.Body
                            onClick={() => idalbum(album.id)}
                            >
                            <Card.Img variant="top"  className='image' src={album.cover_small} />
                            <Card.Title  className='titre'>Nom de l' album: {album.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
        </div>
)}

        
