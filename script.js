const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.discoverURL = `https://api.themoviedb.org/3/discover/movie`;
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

app.firstActorQuery = '';
app.secondActorQuery = '';

app.getFirstActorID = $.ajax({
  type: 'GET',
  url: `${app.searchUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: 'Tom Hanks',
    language: `en-US`,
    include_adult: `false`,
  },
});

app.getSecondActorID = $.ajax({
  type: 'GET',
  url: `${app.searchUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: 'Brad Pitt',
    language: `en-US`,
    include_adult: `false`,
  },
});

$.when(app.getFirstActorID, app.getSecondActorID)
  .done(function(actor1, actor2) {
    // console.log(actor1[0].results[0].id);
    app.firstActorID = actor1[0].results[0].id;
    // console.log(actor2[0].results[0].id);
    app.secondActorID = actor2[0].results[0].id;
  })
  .then(function() {
    app.getMovies = $.ajax({
      type: 'GET',
      url: `${app.discoverURL}`,
      dataType: 'json',
      data: {
        api_key: `${app.apiKey}`,
        sort_by: `vote_average.desc`,
        with_people: `${app.firstActorID},${app.secondActorID}`,
        language: `en-US`,
        page: 1,
      },
      success(response) {
        console.log(response.results[0].original_title);
      },
    });
  });
