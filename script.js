const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.discoverUrl = `https://api.themoviedb.org/3/discover/movie`;
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

app.firstActorQuery = `Seth Rogen`;
app.secondActorQuery = `James Franco`;

// make API calls to get actor details
app.getFirstActorDetails = $.ajax({
  type: 'GET',
  url: `${app.searchUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: `${app.firstActorQuery}`,
    language: `en-US`,
    include_adult: `true`,
  },
});

app.getSecondActorDetails = $.ajax({
  type: 'GET',
  url: `${app.searchUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: `${app.secondActorQuery}`,
    language: `en-US`,
    include_adult: `true`,
  },
});

// promise return for actor details
$.when(app.getFirstActorDetails, app.getSecondActorDetails)
  .done(function(actor1, actor2) {
    // store the actors' name, id, and photo. To reduce repetition, the objects are storred in arrays
    app.actorDetails = [
      {
        id: actor1[0].results[0].id,
        name: actor1[0].results[0].name,
        photo: `${app.imagesUrl}${actor1[0].results[0].profile_path}`,
      },
      {
        id: actor2[0].results[0].id,
        name: actor2[0].results[0].name,
        photo: `${app.imagesUrl}${actor2[0].results[0].profile_path}`,
      },
    ];
  })
  .then(function getAllMovies() {
    app.getMovies = $.ajax({
      type: 'GET',
      url: `${app.discoverUrl}`,
      dataType: 'json',
      data: {
        api_key: `${app.apiKey}`,
        sort_by: `vote_average.desc`,
        with_people: `${app.actorDetails[0].id},${app.actorDetails[1].id}`,
        language: `en-US`,
        page: 1,
        include_adult: true,
      },
      success(response) {
        // Display information of Top 10 movies both actors have worked together in.
        for (let i = 0; i < 12; i++) {
          $('#movie-info-container').append(
            `<div class="col-4 movie-info animated fadeIn">
            <img src='${app.imagesUrl}${response.results[i].poster_path}' alt='${response.results[i].title}'>
            <h4>${response.results[i].title}</h4>
            </div>`
          );
        }
      },
    });
  })
  .catch(function(error) {
    $('#movie-info-container').append(
      `<h1>Sorry, there are no movies in which they've worked</h1>`
    );
  });
