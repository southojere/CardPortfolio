class PokemonResolver {
  constructor() {
  }

  /**
   * @returns Promise<{Pokemon}>
   */
  getPokemon = () => {
    return this.loadPokemon();
  }

  loadPokemon = async () => {
    const random = Math.floor(Math.random() * 30) + 1;

    const pokemon = await resolveApiRequest(
      `https://pokeapi.co/api/v2/pokemon/${random}/`
    );
    const abilities = await Promise.all(this.loadAbilities(pokemon.abilities));
    

    return  {
      name: pokemon.name,
      abilities,
    }
  };

  loadAbilities = abilities => {
    return abilities.map(async ({ ability, is_hidden, slot }) => {
      const name = ability.name;
      const abilityDetails = await resolveApiRequest(ability.url);
      const { effect: desc, short_effect: shortDesc } = abilityDetails.effect_entries[0];
      return {
        name,
        desc,
        shortDesc,
      }
    });
  };
}

/**
 * Helper function to jsonify the fetch response
 */
const resolveApiRequest = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default PokemonResolver;
