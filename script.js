const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.baseUrl = `https://api.themoviedb.org/3/search/person`;
app.imagesUrl = `http://image.tmdb.org/t/p`;

const getActorDetails = $.ajax({
  type: 'GET',
  url: `${app.baseUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: `Tom Hanks`,
    language: `en-US`,
    include_adult: `false`,
    page: 1,
  },
}).done(function(response) {
  const getActorID = `${response.results[0].id}`;
  console.log(getActorID);
});
