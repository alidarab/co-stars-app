// Get User Input to pass a search Query to the API
// The query then searches for the actor Details and gets the actor's ID
// The Returned ID then needs to be passed onto another API call that takes in the ID and searches for 


const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.creditsURL = `https://api.themoviedb.org/3/person/${showActorID()}/combined_credits?`
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

// This function takes the User Query and gets the object, only the ID is selected.
app.getActorDetails = (userQuery) => {
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
    }
    }).then(function(response) {
      app.showActorID(response.results[0].id)
    });
}

app.showActorID = function(data){
  // console.log(data);
  return data
}


app.init = function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const userSelection = $('input').val();
    app.getActorDetails(userSelection);
  });
}

$(function () {
  app.init();
});