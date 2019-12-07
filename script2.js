const app = {};

// API Key
app.apiKey = `d9aa9ee0be2d538327e8e9474bd49cbf`;
app.searchUrl = `https://api.themoviedb.org/3/search/person`;
app.imagesUrl = `http://image.tmdb.org/t/p/w300_and_h450_bestv2`;

app.firstActorQuery = ''
app.secondActorQuery = ''


// This function takes the User Query and gets the object, only the ID is selected.
app.getFirstActorID = $.ajax({ // !Added Return just before $ajax
    type: 'GET',
    url: `${app.searchUrl}`,
    dataType: 'json',
    data: {
      api_key: `${app.apiKey}`,
      query: 'Tom Hanks',
      language: `en-US`,
      include_adult: `false`,
      page: 1,
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
      page: 1,
    },
  });


app.init = function() {
  $.when(app.getFirstActorID, app.getSecondActorID).done(function(actor1, actor2) {
    console.log(actor1);
    console.log(actor2);
  });
};

$(function() {
  app.init();
});
