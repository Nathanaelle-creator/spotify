import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react'
import { useNavigate, useParams } from "react-router-dom";


export default function search(){
const [searchInput, setSearchInput] = useState('');
const [albums, setAlbums] = useState([]);
const [playingTrack,setPlayingTrack]=useState();
const [artists, setArtists] = useState([]);
const navigate = useNavigate();

//Recupere id 
function idalbum(albumId) {
    console.log("ID de l'artiste sélectionné:", albumId);
    navigate(`/detailalbum/${albumId}`); 
    
  }

  function idArtiste(artistId) {
    console.log("ID de l'artiste sélectionné:", artistId);
    navigate(`/detailartist/${artistId}`); 
    
  }


//Declaration des variables
useEffect(() => {
  //fetch("http://localhost:8000/api")
  //.then(data => data.json())
  //.then(data => {   
  //console.log(data);
//}, []);

})
//Barre de recherche
var albumsParametre={
method: 'GET',
headers:{
    'Content-Type':'application/json',
}
}
 // Fonction de recherche
async function search() {
console.log("Search for: " + searchInput); 
  //Pour tous les abums 
    //let response = await fetch('http://localhost:8000/albums')
    //.then(reponse=>reponse.json())
    //.then(data=>{
    //console.log(data);
    //setAlbums(data);
    // Faire la barre de recherche
    const response=await fetch(`http://localhost:8000/search?query=${searchInput}&type=artist`)
    const dataartist = await response.json()
    
    //.then(reponse=>reponse.json())
    //.then(data=>{console.log(data);
   // })
    //Recuperer l'ID de l'artiste
    const artistname = dataartist.artists[0].name; // recuperer le nom 
    const artistID=dataartist.artists[0].id//recupere id 
    console.log("nom de l'artiste:", artistname);
    console.log("ID de l'artiste:", artistID);
    setArtists(dataartist.artists);

    //albums avc le bon ID 
    const albumResponse = await fetch(`http://localhost:8000/search?query=${artistname}&type=album`)
    .then(response => response.json())
    .then(data => {
    console.log("Albums trouvés :", data.albums);
    setAlbums(data.albums);
    });
//console.log(albums);
//Récupere les musique des albums
fetch(`http://localhost:8000/albums/${artistID}`)
.then(response => response.json())  
.then(dataSong => {
    console.log("SONG artiste ID:", dataSong.tracks);
    setPlayingTrack({
    song:dataSong.tracks[0]?.mp3,
    name: dataSong.tracks[1].name,
    }); 
});

}
//Function

//Affiche
return (
<div className="App">
<nav className='nav1'>
        <ul className='styleul'>
        <li><a href="/home">Home</a></li>
        <li><a href="/listalbum">Albums</a></li>
        <li><a href="/listartist">Artists</a></li>
        <li><a href="/listgenres">Genres</a></li>
        <li><a href="/profil">Profil</a></li>
        </ul>
        </nav>
    <h1>Spotify</h1>
    <Container>
        <InputGroup className="mb-3" size="lg">
        <FormControl
            placeholder="Search for artist"
            type="input"
            onKeyDown={(event) => {
            if (event.key === 'Enter') {
                //search();
                //console.log("Pressed enter")
                search();
            }
            }}
            onChange={event=>setSearchInput(event.target.value)}
        />
        <Button onClick={search}>
            Search
        </Button>
        </InputGroup>
    </Container>
    <Container>
    <Row className="mx-2 row row-cols-4">
        {albums.map((album) => (
            <Card key={album.id} className="m-2" 
            style={{ width: '18rem' }}
            onClick={() => idalbum(album.id)}
            >
            <Card.Img variant="top" src={album.cover_small} />
            <Card.Body>
                <Card.Title>Nom album :{album.name}</Card.Title>
                <Card.Text>description de l'album{album.description}</Card.Text>
            </Card.Body>
            </Card>
            
        ))}
        </Row>
    </Container>
    <Row className="mx-2 row row-cols-4">
    {artists.map((artist) => (
<Card key={artist.id} className="m-2" 
style={{ width: '18rem' }}
onClick={() => idArtiste(artist.id)}
>
    <Card.Img variant="top" src={artist.cover_small} />
    <Card.Body>
    <Card.Img variant="top" src={artist.photo} />
    <Card.Title>Nom artiste : {artist.name}</Card.Title>
    <Card.Text>Description : {artist.description}</Card.Text>
    </Card.Body>
</Card>
))}
        </Row>
    </div>
)
}










    //return <h1>Search</h1>;

