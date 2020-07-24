const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.discoverUrl = `https://api.themoviedb.org/3/discover/movie`;
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

app.beginSearch = function (first, second) {
  app.firstActorQuery = first;
  app.secondActorQuery = second;

  // make API calls to get actor details
  app.getFirstActorDetails = $.ajax({
    type: "GET",
    url: `${app.searchUrl}`,
    dataType: "json",
    data: {
      api_key: `${app.apiKey}`,
      query: `${app.firstActorQuery}`,
      language: `en-US`,
      include_adult: `true`,
    },
  });

  app.getSecondActorDetails = $.ajax({
    type: "GET",
    url: `${app.searchUrl}`,
    dataType: "json",
    data: {
      api_key: `${app.apiKey}`,
      query: `${app.secondActorQuery}`,
      language: `en-US`,
      include_adult: `true`,
    },
  });

  // promise return for actor details
  $.when(app.getFirstActorDetails, app.getSecondActorDetails)
    .done(function (actor1, actor2) {
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
        type: "GET",
        url: `${app.discoverUrl}`,
        dataType: "json",
        data: {
          api_key: `${app.apiKey}`,
          sort_by: `vote_average.desc`,
          with_people: `${app.actorDetails[0].id},${app.actorDetails[1].id}`,
          language: `en-US`,
          page: 1,
          include_adult: true,
        },
        success(response) {
          // Display information of the searched Actors
          $("#actor-details").html(`
          <div class="col-md-6 text-center wow animated fadeIn">
            <img src="${app.actorDetails[0].photo}" alt="${app.actorDetails[0].name}">
            <h4>${app.actorDetails[0].name}</h4>
          </div>
          <div class="col-md-6 text-center wow animated fadeIn">
            <img src="${app.actorDetails[1].photo}" alt="${app.actorDetails[1].name}">
            <h4>${app.actorDetails[1].name}</h4>
          </div>`);
          // Display information of Top 10 movies both actors have worked together in.
          for (let i = 0; i < response.total_results; i++) {
            $("#movie-info-container").append(
              `
            <div class="card my-5">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src="${app.imagesUrl}${response.results[i].poster_path}" class="card-img" alt="${response.results[i].title}">
                </div>
                <div class="col-md-8 d-flex align-items-center">
                  <div class="card-body">
                    <h2 class="card-title">${response.results[i].title}</h2>
                    <p class="card-text">${response.results[i].overview}</p>
                    <p class="card-text"><small class="text-muted">Released: ${response.results[i].release_date}</small></p>
                  </div>
                </div>
              </div>
            </div>
            `
            );
          }
        },
      });
    })
    .catch(function (error) {
      $("#movie-info-container").append(
        `<h1>Sorry, there are no movies in which they've worked</h1>`
      );
    });
};

app.init = function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    const userQuery1 = $('input[name="first-actor-name"]').val();
    const userQuery2 = $('input[name="second-actor-name"]').val();
    app.beginSearch(userQuery1, userQuery2);
    $('input[type="submit"]').attr("disabled", true);
  });
  new WOW().init();
};

$(document).ready(function () {
  app.init();
});
