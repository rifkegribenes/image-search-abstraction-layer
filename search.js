const rp = require('request-promise');

// const GOOGLE_API_SEARCH_ENDPOINT = "https://www.googleapis.com/customsearch/v1";
// const GOOGLE_API_SEARCH_CX = process.env.GOOGLE_API_SEARCH_CX2;
// const GOOGLE_API_SEARCH_KEY = process.env.GOOGLE_API_SEARCH_KEY2;

const FLICKR_API_ENDPOINT = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_SECRET = process.env.FLICKR_SECRET;

// const Flickr = require("flickrapi"),
//     flickrOptions = {
//       api_key: FLICKR_API_KEY,
//       secret: FLICKR_SECRET
//     };

// Flickr.tokenOnly(flickrOptions, (error, flickr) => {
//   // we can now use "flickr" as our API object,
//   &api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&text=${searchTerm}&content_type=1"

//   // reconstruct urls: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_m.jpg
// });

module.exports = (query, offset, callback) => {
  rp ({
    uri: FLICKR_API_ENDPOINT,
    qs : {
      api_key: FLICKR_API_KEY,
      text: query.replace(" ", "+"),
      per_page: 10,
      pages: 1,
      format: 'json',
      content_type: 1,
      start: offset || 1,
      nojsoncallback: 1
    },
    json: true
  })
    .then((results) => {
        console.log('search.js > 21: URL');
        console.log(`${FLICKR_API_ENDPOINT}?api_key=${FLICKR_API_KEY}&content_type=1&text=${query.replace(" ", "+")}&format=json&per_page=10&start=1&pages=1&nojsoncallback=1`);
        console.log('search.js > 21');
        console.log(results.photos.photo);
        // console.log(results.photos);
        // if (!results.photos.photo) {
        //   return callback({error: `Error searching for "${query}": No Results`});
        // }
        const itemsRaw = results.photos.photo.map(item => {
          return {
           "url" : `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
           "snippet": item.title,
           "thumbnail" : `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_t.jpg`,
           "context" : `https://www.flickr.com/photos/${item.owner}/${item.id}`
          }});
        const items = JSON.stringify(itemsRaw);
        return callback({query, offset, items});
    })
    .catch((err) => {
      console.log(err);
      console.log(err.error.error.message);
      let msg = err.error.error.message;
      if (err.error.error.code === 403) {
        msg = 'Daily search limit exceeded'
      }
      return callback({error: `Error searching for "${query}": ${msg}`});
    });
};
