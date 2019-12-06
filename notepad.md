/* function handeError(err) {
  console.log(`We have an error`);
  console.log(err);
}

const apiURL = `https://api.themoviedb.org/3/search/person?include_adult=false&page=1&language=en-US&query=john krasinski&api_key=d9aa9ee0be2d538327e8e9474bd49cbf`

const getActorDetails = fetch(apiURL);

getActorDetails.then(response => {
  return response.json();
}).then( data => {
  console.log(data)
  console.log(`${data.results[0].known_for[0].backdrop_path}`)
}).catch(handeError) */


const pokePromise1 = $.ajax({
  url : 'https://pokeapi.co/api/v2/pokemon/1/',
  dataType : 'json',
  method: 'GET'
});

const pokePromise2 = $.ajax({
  url : 'https://pokeapi.co/api/v2/pokemon/1/',
  dataType : 'json',
  method: 'GET'
});

$.when(pokePromise1, pokePromise2).done(function(pokemon1, pokemon2){
  console.log(pokemon1);
  console.log(pokemon2);

  // Do whatever else you need to do with your new pokemon data
})