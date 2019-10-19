const typeToColor = {
  bug: "#8dc13a",
  fire: "#fa9c45",
  psychic: '#9873a0',
  ground: '#d38042',
  normal: '#e3e6e5',
  flying: '#d4d4d4',
  ghost: '#97679e',
  water: '#58b8e8',
  electric: '#f6d569',
  grass: '#a2d224',
  poison: '#936bab',
};
// #fde55b
class PokemonResolver {
  constructor() {}

  /**
   * @returns Promise<{Pokemon}>
   */
  getPokemon = () => {
    return this.loadPokemon();
  };

  loadPokemon = async () => {
    const random = Math.floor(Math.random() * 30) + 1;

    const pokemon = await getJSON(
      `https://pokeapi.co/api/v2/pokemon/${random}/`
    );
    const abilities = await Promise.all(this.loadAbilities(pokemon.abilities));
    console.log(pokemon);
    const images = this.getImages(pokemon);
    const types = this.getTypes(pokemon);
    return {
      id:pokemon.id,
      name: pokemon.name,
      abilities,
      images,
      weight: pokemon.weight,
      types,
      styles: {
        backgroundColor: typeToColor[types[0]],
        borderColor: typeToColor[types[1]]
      }
    };
  };

  getImages = ({ sprites }) => {
    const { front_default, back_default } = sprites;
    return [front_default, back_default];
  };

  getTypes = ({types}) => {
    return types.map(({type}) => {
      return type.name;
    })
  }

  loadAbilities = abilities => {
    return abilities.map(async ({ ability, is_hidden, slot }) => {
      const name = ability.name;
      const abilityDetails = await getJSON(ability.url);
      const {
        effect: desc,
        short_effect: shortDesc
      } = abilityDetails.effect_entries[0];
      return {
        name,
        desc,
        shortDesc
      };
    });
  };
}

/**
 * Helper function to jsonify the fetch response
 */
const getJSON = async url => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default PokemonResolver;
