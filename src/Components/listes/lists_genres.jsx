import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function DetailGenre() {
    const [searchInput, setSearchInput] = useState('');
    const [genre, setgenre] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!genre) return;
        search();
    }, []);


function idgenre(genreId) {
    console.log("ID de l'artiste sélectionné:", genreId);
    navigate(`/detailgenre/${genreId}`); 
}

    async function search() {
        console.log("Search for: " + searchInput);
            const response = await fetch(`http://localhost:8000/genres`);
            const data = await response.json();
            console.log("Données récupérées:", data);
                setgenre(data);
        
    }

    return (
    <div>
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
        
    </div>
        <Container >
            <h1>Genre</h1>
            <Row>
                {genre.map((genre, i) => (
                    <Card  key={genre.id}
                    style={{ width: '18rem', margin: '10px' }}
                    onClick={()=>setgenre}
                    >
                        <Card.Body className='genre'  >
                            <Card.Title >{genre.name}</Card.Title>
                            <p onClick={() => idgenre(genre.id)}>{genre.id}</p>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
        </div>
    );

}
