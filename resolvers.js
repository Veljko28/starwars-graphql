const axios = require('axios');


const mapped = array => {
  const reses = array.map(async (url) => {
         const res = await axios.get(url);
         return await res.data;
      });
      
      return Promise.all(reses);
};

const singleMap = async (url) => {
  if (url === null) return null; 
  const res = await axios.get(url);
  return await res.data;
}


const resolvers = {
  Person: {
    homeworld: async (parent) => await singleMap(parent.homeworld),

    films: (parent) => mapped(parent.films),
     
    species: (parent) => mapped(parent.species),

    vehicles: (parent) => mapped(parent.vehicles),

    starships: (parent) => mapped(parent.starships),
  },

  Planet: {
    residents: (parent) => mapped(parent.residents),

    films: (parent) => mapped(parent.films),
  },

  Specie: {
   homeworld: async (parent) => await singleMap(parent.homeworld),
  },
  
  Vehicle: {
    pilots: (parent) => mapped(parent.pilots),

    films: (parent) => mapped(parent.films),
  },

  StarShip: {
    pilots: (parent) => mapped(parent.pilots),
    
    films: (parent) => mapped(parent.films),
  },
 
  Query: {
    getPerson: async (_,{id}) => {
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      return await response.data;
    }
  },

};

module.exports = resolvers;
