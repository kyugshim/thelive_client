const fetch = require("node-fetch");

export const searchYouTube = ({ query, max, key }, callback) => {
  const url = 'https://www.googleapis.com/youtube/v3/search';
  let youtube = {
    type: '&type=video',
    q: '&q=' + query,
    max: '&maxResults=' + max,
    key: '&key=' + key,
    part: '&part=' + 'snippet'
  }
  fetch(`${url}?${youtube.type}${youtube.q}${youtube.max}${youtube.key}${youtube.part}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      callback(data.items)
    })
    .catch((err) => { console.log(err) })
};