import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './stye.css';
import Pagination from './pagination.jsx'

export default function lists_album() {
  const [searchInput, setSearchInput] = useState('');
  const [albums, setAlbums] = useState([]);
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
  const fetchArtist = async () => {
    const res = await fetch('http://localhost:8000/artists');
    const data = await res.json();
    setArtists(data);
  };
  fetchArtist();
 

//setPageCount(Math.ceil(posts.length/posts));


}, []);
 const indexOfLastAlbum = currentPage * postPerpage;
const indexOfFirstAlbum = indexOfLastAlbum - postPerpage;
const currentArtist = artists.slice(indexOfFirstAlbum, indexOfLastAlbum);
const paginate = pageNumber => setCurrentPage(pageNumber);



  //Faire ma redirection une fonction qui recupèere ID
  function idArtiste(artistId) {
    console.log("ID de l'artiste sélectionné:", artistId);
    navigate(`/detailartist/${artistId}`); 
    
  }

//Barre de recherche
async function search(){
  console.log("Search for: " + searchInput); 
  //Afficher les genres
  const response = await fetch(`http://localhost:8000/artists`);
  const data = await response.json();
  console.log("Artist récupérées:", data);
  setArtists(data)

}
return (
<div className="App">
      <nav className='nav1'>
        <ul className='styleul'>
        <li><a href="/home">Home</a></li>
        <li><a href="/listalbum">Albums</a></li>
        <li><a href="/listartist">Artists</a></li>
        <li><a href="/listgenres">Genres</a></li>
        </ul>
        </nav>
    <h1> Listing des artistes 💃</h1>
      <Container>
      <Row className="mx-2 row row-cols-4">
      {currentArtist.map((artist) => (
            <Card key={artist.id} className="card" 
            style={{ width: '18rem', margin: '10px' }}
            onClick={() => idArtiste(artist.id)}
            >
              <Card.Img variant="top" src={artist.photo} />
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Card.Text>Description de l'album: {artist.description}</Card.Text>
              </Card.Body>
            </Card>
            
          ))}
        </Row>
        <div>

  <Pagination 
  className='grid-ul'
  postsPerPage={postPerpage}
  totalPosts={artists.length}
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

