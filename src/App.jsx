import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';  
import Login from './Components/Login/Login.jsx';
import Detail_album from './Components/listes/detail_album.jsx';
import Detail_genre from './Components/listes/detail_genre.jsx';
import Detail_artist from './Components/listes/details_artiste.jsx';
import Lists_artiste from './Components/listes/lists_artiste.jsx';
import Profil from './Components/listes/profil.jsx';
import Search from './Components/listes/search.jsx';
import Register from './Components/Register/Register.jsx';
import Lists_genre from './Components/listes/lists_genres.jsx';
import Lists_album from './Components/listes/lists_album.jsx';



function App(){

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detailalbum/:id" element={<Detail_album/>} />
        <Route path="/detailgenre/:id" element={<Detail_genre/>} />
        <Route path="/detailartist/:id" element={<Detail_artist/>} />
        <Route path="/listalbum" element={<Lists_album/>} />
        <Route path="/listartist" element={<Lists_artiste/>} />
        <Route path="/listgenres" element={<Lists_genre/>} />
        <Route path="/profil" element={<Profil/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;


