<template>

  <div class="pokemon-container">
    <img class="hidden-pokemon" :src="imgSrc" alt="Pokemon">
    <img
      v-if="showPokemon"
      class="fade-in"
      :src="imgSrc"
      alt="Pokemon"
    >
  </div>

</template>

<script>
export default {
  name: "PokemonPicture",
  props:{
    showPokemon:{
      type: Boolean,
      required: true,
      default: false
    },
    pokemonId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      img: this.pokemonId
    }
  },

  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  }
}
</script>

<style scoped>

/* Pokemon Picture */
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  position: absolute;
  width: 100vw;
  margin-left: -50vw;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0);
}

</style>