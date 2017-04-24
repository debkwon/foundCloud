FoundCloud - Discover new music through the SoundCloud and Giphy APIs
---------
To get started:
Fork/clone/get your hands on this repo

You'll need to get a SoundCloud Client ID for use in this app: https://developers.soundcloud.com/

In your command line:

* make sure you have node version 6.7.0 or higher (To check which version you have, type 'node --version' OR 'node -v' to check. Update by typing 'npm install npm@latest -g')
* npm install
* npm start
* npm run test

In your browser, head to localhost:3000

Overview
---------
The foundCloud app utilizes the SoundCloud and Giphy APIs so you can explore music visually.

SoundCloud tracks with tags will have related GIFs displayed as links to those tracks. If the artist name or song title don't interest you, the GIFs might 😎

If there isn't a relevant GIF to match a tag, a random one will be displayed.

Try out SoundCloud's API: https://developers.soundcloud.com/docs/api/guide
or Giphy's: https://github.com/Giphy/GiphyAPI

Built with Node/Express + SoundCloud API + Giphy API

Routes
---------
Currently, there is only one route, '/'

This displays the search bar to start exploring music. A search will display a limit of 15 tracks with their tags-as-GIFs.

Templates
---------
foundCloud uses nunjucks for using partials in templates. If you go to the /views folder, there's an 'index.html' that holds the main sections of the page. The setup info can be found in the 'layout.html' file.

Future Implementations
---------
In future iterations, the track tags would be displayed as text and the GIF would appear only on a hover over that specific tag, along with a clip of that song.

Needs additional testing, including more frontend testing and covering the API calls.




