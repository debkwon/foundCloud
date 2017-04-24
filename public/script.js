$(document).ready(function(){

  SC.initialize({
    client_id: //***PUT KEY HERE***
  });

  //user search for tracks through the search bar and pressing enter key
  $("#search-bar").keypress(function(event){
    if (event.which == 13) {
      let page_limit = 15;
      let query = document.getElementById('search-bar').value;
      let results = $('.search-results')
      let gifStart = 'http://api.giphy.com/v1/gifs/search?q='
      let gifEnd = '&api_key=dc6zaTOxFJmzC'
      let tags;
      let tagsToAdd = "";

      //API call with user's search
      SC.get('/tracks', {
        q: query,
        limit: page_limit
      }).then(function(tracks) {
          results.empty()

          for (let i = 0; i < tracks.length; i++){
            //get and assign tags variable as an array of formatted tags
            tags = grabTags(tracks[i].tag_list);
            //this block will add GIFs from each of the returned track tags
            for (let j = 0; j < tags.length; j++){
              //call to GIPHY API w/the current tag as a query
              fetch(`${gifStart + tags[j] + gifEnd}`)
                .then(res => res.json())
                .then(jsonRes => {
                  //if there's a small GIF link, add it into the tagsToAdd string, holding the html info to append later
                  if (tags[j] && jsonRes['data'][0]['images']['fixed_height_small']['url']) {
                    tagsToAdd += `
                      <a href='${tracks[i].permalink_url}'>
                        <img src='${jsonRes['data'][0]['images']['fixed_height_small']['url']}'
                        alt='${tags[j]}'
                        title='${tracks[i].title}'
                        >
                      </a>`
                  }
                  //otherwise if there's not a relevant GIF/tag, make a call to get a random GIF and add that to tagsToAdd
                  else {
                    fetch("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg-13")
                      .then(res => res.json())
                      .then(jsonRes => {
                        if (tags[j]) {
                          tagsToAdd += `
                            <a href='${tracks[i].permalink_url}'>
                              <img src='jsonRes['data']['fixed_height_small_url']'
                              alt='${tags[j]}'
                              title='${tracks[i].title}'
                              >
                            </a>`
                        }
                      })
                  }
                })
                .catch(err => {
                  console.log('Request failed', err)
                });
            }//end of inner for loop

            //add a div holding some general track info to display (artwork, title, user) wrapped as links to the track or user on SoundCloud
            results.append(`
              <div class='result'>
                <a href='${tracks[i].permalink_url}'>
                  <img src='${tracks[i].artwork_url}' alt='${tracks[i].title}' height="90" width="90" class='artwork'>
                  <p class='text'>${tracks[i].title}</p><br />
                </a>
                <a href='${tracks[i].user.permalink_url}'><p><i>shared by:&nbsp</i> ${tracks[i].user.username}</p>
                </a>
              </div>
              <br />`)
          }//end of outer for loop
        //wait to add the GIFs to the <aside> section that holds them
        setTimeout(function(){$(".tags").empty().append(`${tagsToAdd}`);}, 1500);
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  });


//this helper function returns an array of properly formatted tags based on a string passed in (since this is how the data from the SoundCloud API is returned)
function grabTags(str){
  //we're given a string of tags
  // a number of those tags are enclosed within double quotes, which we want to count as a single tag
  return [].concat.apply([], str.split('"').map(function(a,b){
   return b%2 ? a : a.split(' ')
   })).filter(Boolean);
  }
});
