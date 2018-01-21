const rp = require('request-promise');

const GOOGLE_API_SEARCH_ENDPOINT = "https://www.googleapis.com/customsearch/v1";
const GOOGLE_API_SEARCH_CX = process.env.GOOGLE_API_SEARCH_CX;
const GOOGLE_API_SEARCH_KEY = process.env.GOOGLE_API_SEARCH_KEY;

module.exports = (query, offset, callback) => {
  rp ({
    uri: GOOGLE_API_SEARCH_ENDPOINT,
    qs : {
      key: GOOGLE_API_SEARCH_KEY,
      cx: GOOGLE_API_SEARCH_CX,
      q: query.replace(" ", "+"),
      searchType: 'image',
      num: 10,
      start: offset || 1
    },
    json: true
  })
    .then((results) => {
        // console.log(results.items);
        if (!results.items || !results.items.length) {
          return callback({error: `Error searching for "${query}": No Results`});
        }
        const items = results.items.map(item => {
          return {
           "url" : item.link,
           "snippet": item.snippet,
           "thumbnail" : item.image.thumbnailLink,
           "context" : item.image.contextLink
          }});
        return callback({query, offset, items});
    })
    .catch((err) => {
      console.log(err.error.error.message);
      let msg;
      if (err.error.error.code === 403) { msg = 'Daily search limit exceeded'}
      return callback({error: `Error searching for "${query}": ${msg ? msg : err.error.error.message}`});
    });
};
