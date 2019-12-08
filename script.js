const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.discoverURL = `https://api.themoviedb.org/3/discover/movie`;
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

app.firstActorQuery = '';
app.secondActorQuery = '';

app.getFirstActorDetails = $.ajax({
  type: 'GET',
  url: `${app.searchUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: 'Seth Rogen',
    language: `en-US`,
    include_adult: `false`,
  },
});

app.getSecondActorDetails = $.ajax({
  type: 'GET',
  url: `${app.searchUrl}`,
  dataType: 'json',
  data: {
    api_key: `${app.apiKey}`,
    query: 'James Franco',
    language: `en-US`,
    include_adult: `false`,
  },
});

$.when(app.getFirstActorDetails, app.getSecondActorDetails)
  .done(function(actor1, actor2) {
    app.firstActor = {
      id: actor1[0].results[0].id,
      name: actor1[0].results[0].name,
      photo: `${app.imagesUrl}${actor1[0].results[0].profile_path}`,
    };
    console.log(app.firstActor.id, app.firstActor.name, app.firstActor.photo);
    // console.log(actor1[0].results[0].name);
    // console.log(`${app.imagesUrl}${actor1[0].results[0].profile_path}`);
    // app.firstActorID = actor1[0].results[0].id;
    // console.log(actor2[0].results[0].id);
    // app.secondActorID = actor2[0].results[0].id;
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
        for (let i = 0; i < 10; i++) {
          console.log(response.results[i].title);
        }
      },
    });
  })
  .catch(function(error) {
    console.log(`That's an error.`);
  });
