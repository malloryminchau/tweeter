/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

function createTweetElement(tweet) {
    const newTweet = `
      <article class="tweet-container"> 
        <header class="tweet-header">
          <img src=${tweet.user.avatars}>
          <span class="real-name">${tweet.user.name}</span>
          <span class="username">${tweet.user.handle}</span>
        </header>
        <span class="text">
          ${tweet.content.text}
        </span>
        <footer class="tweet-footer">
          ${tweet.created_at}
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>        
      </article>
      `
  return newTweet
}




// Test / driver code (temporary). Eventually will get this from the server.


// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
 // to add it to the page so we can make sure it's got all the right elements, classes, etc.

function renderTweets(newTweet) {
  for (let tweet of newTweet) {
    let $newTweet = createTweetElement(tweet)
    $('#all-tweets').prepend($newTweet);
  }
}


$(document).ready(function() {
  renderTweets(tweetData)
})


$(document).ready(() => {
  $(".tweet-form").on('submit', (event) => {
    event.preventDefault();
    const tweetInput = $(".tweet-form").serialize();
    console.log(tweetInput)
    if(tweetInput.length <= 5) {
      alert('Please enter text');
    }
    if(tweetInput.length > 145) {
      alert('Text too long');
    }
    $.ajax({
      url:`/tweets`,
      method: 'POST',
      data: tweetInput,
      success: loadTweets()
    })
  })


  const loadTweets = () => {
    $.ajax({
      url:`/tweets`,
      method: 'GET',
      dataType: 'JSON'
    }).then(function(data) {
      renderTweets(data)
    })
  }
  loadTweets()
})
