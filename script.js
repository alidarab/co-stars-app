// Get User Input to pass a search Query to the API
// The query then searches for the actor Details and gets the actor's ID
// The Returned ID then needs to be passed onto another API call that takes in the ID and searches for
// Next Step: Make two getActorDetails Calls, and get IDs and pass them onto the an API Call that looks for two actors
// Have Brad Pitt and Edward Norton ever been in a movie together?
// URL: /discover/movie?with_people=287,819&sort_by=vote_average.desc

const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

// This function takes the User Query and gets the object, only the ID is selected.
app.getActorDetails = userQuery => {
  $.ajax({
    type: 'GET',
    url: `${app.searchUrl}`,
    dataType: 'json',
    data: {
      api_key: `${app.apiKey}`,
      query: userQuery,
      language: `en-US`,
      include_adult: `false`,
      page: 1,
    },
  }).then(function(response) {
    app.getCredits(response.results[0].id);
  });
};

app.creditsURL = `https://api.themoviedb.org/3/person`;

app.getCredits = actorID => {
  $.ajax({
    url: `${app.creditsURL}/${actorID}/combined_credits`,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: `${app.apiKey}`,
      language: `en-US`,
    },
  }).then(responseFromID => {
    console.log(responseFromID.cast);
    console.log(`Tom Hanks starred in ${responseFromID.cast[0].title}`);
    console.log(`Tom Hanks starred in ${responseFromID.cast[1].title}`);
  });
};

app.init = function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const userSelection = $('input').val();
    app.getActorDetails(userSelection);
  });
};

$(function() {
  app.init();
});
