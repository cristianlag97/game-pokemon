<template>

  <div v-if="lives >= 1">
    <h3>Correctos {{answerGood}} - Incorrecto {{answerBad}}</h3>
    <h3 v-if="lives >= 2">Tienes {{lives}} intentos</h3>
    <h3 v-else >tienes {{lives}} intento</h3>
    <h1 v-if="!pokemon" >Espere por favor...</h1>

    <div v-else>
      <h1>¿Quien es este pokémon?</h1>

      <Pokemon-picture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
      <Pokemon-options :pokemons="pokemonArr" @selection="checkAnswer" />

      <template  v-if="showAnswer" >
        <h2 class="fade-in">{{message}}</h2>
        <!--<button @click="newGame">Nuevo juego</button>-->
      </template>
    </div>
  </div>
  <div v-else>
    <h1>Lo siento, pero perdiste todas las oportunidades</h1>
    <h2>¿Quieres empezar de nuevo?</h2>
    <button @click="newGames">Volver a empezar</button>
  </div>

</template>

<script>
import PokemonPicture from "../components/PokemonPicture";
import PokemonOptions from "../components/PokemonOptions";

import getPokemonOptions from "../helpers/getPokemonOptions";

//console.log(getPokemonOptions())

export default {
  name: "PokemonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: null,
      answerGood: 0,
      answerBad: 0,
      lives: 3
    }
  },

  methods: {
   async mixPokemonArr () {
     this.pokemonArr = await getPokemonOptions()

     const rndInt = Math.floor(Math.random() * 4)//floor es pare redondear y quitar decimales y math+random se multiplica x 4 por que quiero que sea entre 0 y 3
     this.pokemon = this.pokemonArr[rndInt]
   },

    checkAnswer(pokemonId){
     this.showAnswer = true

     if(pokemonId === this.pokemon.id){
       this.message = `Correcto, es ${this.pokemon.name}`
       this.answerGood ++
       this.showPokemon = true
       setTimeout(this.newGame, 2000)

     } else {
       this.message = `Incorrecto, era ${this.pokemon.name}`
       this.answerBad ++
       this.lives --

       if(this.lives === 0) {

       }
     }

    },

    newGame() {
      this.pokemonArr = []
      this.showPokemon = false
      this.showAnswer = false
      this.pokemon = null
      this.mixPokemonArr()
    },

    newGames() {
      this.pokemonArr = []
      this.showPokemon = false
      this.showAnswer = false
      this.pokemon = null
      this.answerGood = 0,
      this.answerBad = 0
      this.lives = 3
      this.mixPokemonArr()
    }
  },
  mounted() {
    this.mixPokemonArr()
  }

}
</script>
