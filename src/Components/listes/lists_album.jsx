import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react'
import './stye.css';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from './pagination.jsx'


export default function lists_album() {
  const [searchInput, setSearchInput] = useState('');
  const [albums, setAlbums] = useState([]);
  const [playingTrack,setPlayingTrack]=useState();
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  //Pagination 
  const[posts,setPosts]=useState([]);
  const[loading,setLoading]=useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const [postPerpage] = useState(8);
  const [pageCount,setPageCount]=useState(0)


//Quand la page est active fait l'action suivant
useEffect(() => {
  const fetchAlbums = async () => {
    const res = await fetch('http://localhost:8000/albums');
    const data = await res.json();
    setAlbums(data);
  };
  fetchAlbums();
 

//setPageCount(Math.ceil(posts.length/posts));


}, []);
 const indexOfLastAlbum = currentPage * postPerpage;
const indexOfFirstAlbum = indexOfLastAlbum - postPerpage;
const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
const paginate = pageNumber => setCurrentPage(pageNumber);

//Recupere id 
  function idalbum(albumId) {
    console.log("ID de l'artiste sélectionné:", albumId);
    navigate(`/detailalbum/${albumId}`); 
    
  }

//Barre de recherche
async function search(){
  console.log("Search for: " + searchInput); 
  //Afficher les genres
  const response = await fetch(`http://localhost:8000/albums`);
  const data = await response.json();
  console.log("Albums récupérées:", data);
  setAlbums(data)

}
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

    <h1>Listing Albums 💿</h1>
      <Container >
      <Row className="mx-2 row row-cols-4">
  {currentAlbums.map((album) => (
    <Card key={album.id} className="dispo"
      style={{ width: '36rem',height:'40rem', margin: '10px' }}
      onClick={() => idalbum(album.id)}
    >
      <Card.Img variant="top" src={album.cover_small}
       style={{ width: '15rem',height:'14rem'}}
      />
      <Card.Body
      >
        <Card.Title>{album.name}</Card.Title>
        <Card.Text
        style={{ fontSize:'10px',overflow:'auto',flex:'1',display:'flex'}}
        >
          Description de l'album: {album.description}</Card.Text>
      </Card.Body>
    </Card>
  ))}
</Row>
<div>

  <Pagination 
  className='grid-ul'
  postsPerPage={postPerpage}
  totalPosts={albums.length}
  paginate={paginate}
  
/>
</div>

      </Container>
    </div>
  )
}
//1. Afficher les ablums avec le nom
//2. Afficher 
//3.faire la redirection 