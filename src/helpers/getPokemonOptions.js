import pokemonApi from "../api/pokemonApi";

const getPokemons = () => {
  //Se crea un array con 650 campos
  const pokemonsArr = Array.from(Array(650))//esto crea un arreglo con 650 posiciones vacias
  return pokemonsArr.map( ( _, index) => index +1)//sacamos el index de cada dato del array y lo sumamos con 1 para que quede 1234 y no 0123
}

const getPokemonOptions = async () => {
  //se sortean los campos de forma aleatoria con el sort y el math .random
  //y se toman los 4 primeros numeros del arreglo
  const mixedPokemon = getPokemons().sort(() => Math.random() - 0.5)//sort ordena de forma aleatoria los arreglos, el math... genera un numero random y esto hace que se muevan los datos y se cambien de posicion
  const pokemons = await getPokemonNames( mixedPokemon.splice(0,4) )

  return pokemons
}

const getPokemonNames = async ( [a,b,c,d] = [] ) => {
  //se hace una peticion a una api la cual llama a este metodo y por este metodo le damos los numeros al azar
  //para que traiga pokemons de forma al azar

  //const respuesta = pokemonApi.get(`/1`)
  //console.log(respuesta.data.name, respuesta.data.id)

  const promiseArr = [ // ARREGLO DE PROMESAS
    pokemonApi.get(`/${a}`),//metodo del api que creamos en api
    pokemonApi.get(`/${b}`),//metodo del api que creamos en api
    pokemonApi.get(`/${c}`),//metodo del api que creamos en api
    pokemonApi.get(`/${d}`)//metodo del api que creamos en api
  ]
  const [poke1, poke2, poke3, poke4] = await Promise.all(promiseArr)//hace promesas de forma simultanea, esto espera un arreglo de promesas
  //console.log(a,b,c,d)
  return [
    {name: poke1.data.name, id: poke1.data.id},
    {name: poke2.data.name, id: poke2.data.id},
    {name: poke3.data.name, id: poke3.data.id},
    {name: poke4.data.name, id: poke4.data.id},
  ]
}

export default getPokemonOptions;