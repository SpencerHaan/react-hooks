// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({ status: 'idle' })

  React.useEffect(() => {
    if(!pokemonName) {
      return
    }

    setState({ status: 'pending' })
    fetchPokemon(pokemonName).then(
      pokemon => setState({ status: 'resolved', pokemon }),
      error => setState({ status: 'rejected', error }),
    )
  }, [pokemonName, setState])

  switch (state.status) {
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
        </div>
      )
    case 'idle':
      return 'Submit a pokemon'
    default:
      throw new Error("Unknown status value")
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
