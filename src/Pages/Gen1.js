import React, {Component} from 'react';
import CardList  from '../Components/Cards/CardList';
import TeamBuilder from '../Components/TeamBuildContainer/TeamBuilder'
import SearchBox from '../Components/Search/SearchBox'; 
import './Generation.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const Gen1 = () => {
  // API pokemon will go into this state
  const [pokemonSelection, setPokemonSelection] = useState([])
  const [pokemontype, setPokemonType] = useState([])
  const [search, setSearch] = useState('');

  // useEffect needed for data to render onto page from API
  useEffect(() => {
    getAllPokemonApiData()
    getTypingApiData()
  }, [])

  // fetch for pokemon in this generation
  const getAllPokemonApiData = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokedex/2')
      .then(response => {
        // set state to response 
        setPokemonSelection(response.data.pokemon_entries);
      })
  }

  // fetch for pokemon with certain typing
  const getTypingApiData = (id) => {
    axios
    // .get(`https://pokeapi.co/api/v2/type/${id}/`)
    .get('https://pokeapi.co/api/v2/type/3/')
    .then(response => {
      console.log(response.data.pokemon);
      setPokemonType(response.data.pokemon);
    })
  }

  // change from search bar
  const change4Search = (e) =>{
    // change our state to the value in the search bar
    setSearch(e.target.value);
  }

  // use for an onClick for typing buttons 
  const typingFetch = (e) => {
    // get id from DOM
    const id = e.target.id;
    // send id to fetch call
    getTypingApiData(id);
  }

  return (
    <div className="App">
      
      {/* Title */}
      <h1 id='title'>Generation 1</h1>

      {/* Users team */}
      <div className='teamBuilder'>
        <form className="teamForm">
          <fieldset className="teamFieldset">
            <h3>Your Team</h3>
            <TeamBuilder setState={setPokemonSelection}/>
          </fieldset>
        </form>
      </div>

      {/* Pokemon Selection */}
      <div className='choosePokemon'>
        <form className="cardForm">
          <fieldset className="cardFieldset">
          <h3>Choose Your Pokemon</h3>
          <SearchBox className='searchBar'
            placeholder='Search Pokemon' 
            handleChange= {change4Search}
          />
          <CardList 
            pokemonSelection={pokemonSelection} 
            setState={setPokemonSelection} 
            search={search}
          />
          </fieldset>
        </form>
      </div>
      
    </div>
  )
}

export default Gen1;