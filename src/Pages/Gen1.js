import React, {Component} from 'react';
import CardList  from '../Components/Cards/CardList';
import TeamBuilder from '../Components/TeamBuildContainer/TeamBuilder'
import SearchBox from '../Components/Search/SearchBox'; 
import Filter from '../Components/TypingFilter/Filter';
import './Generation.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const Gen1 = () => {
  // API pokemon will go into this state
  const [pokemonSelection, setPokemonSelection] = useState([])
  const [pokemonType, setPokemonType] = useState([])
  const [search, setSearch] = useState('');

  // useEffect needed for data to render onto page from API
  useEffect(() => {
    getAllPokemonApiData()
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

  // var arr1 = [1,2,3,4],
  //   arr2 = [2,4],
  //   res = arr1.filter(item => !arr2.includes(item));
  //   console.log(res);

  // fetch for pokemon with certain typing
  const getTypingApiData = (id) => {
    axios
    .get(`https://pokeapi.co/api/v2/type/${id}/`)
    .then(response => {
      console.log('this is typing response');
      let arr = []
  
      response.data.pokemon.forEach(element => {
        arr.push(element.pokemon.name)
      });
   
     setPokemonType(pokemonSelection.filter(item => arr.includes(item.pokemon_species.name)));
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
          <Filter handleClick={typingFetch}/>
          <CardList 
            pokemonSelection={pokemonSelection} 
            setState={setPokemonSelection} 
            search={search}
            setSearch={setSearch}
            typing={pokemonType}
          />
          </fieldset>
        </form>
      </div>
      
    </div>
  )
}

export default Gen1;