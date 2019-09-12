/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {

    const newTweet = `
      <article class="tweet-container"> 
        <header class="tweet-header">
          <img src=${tweet.user.avatars}>
          <span class="real-name">${tweet.user.name}</span>
          <span class="username">${tweet.user.handle}</span>
        </header>
        <div class="text">
          ${escape(tweet.content.text)}
        </div>
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

function addNewTweet() {
  $.ajax({
    url:`/tweets`,
    method: 'GET',
    dataType: 'JSON'
  }).then(function(data) {
    console.log(data)
    $('#all-tweets').prepend(createTweetElement(data[data.length-1]))
  })
  
}


$(document).ready(() => {

  $('#collapse-button').on('click', (event) => {
    event.preventDefault();
    $("#collapse-me").slideToggle();
  })


  $(".tweet-form").on('submit', (event) => {
    event.preventDefault();
    const tweetInput = $(".tweet-text").serialize();
    console.log(tweetInput)
    if(tweetInput.length <= 5) {
      $('.too-short').slideDown()
    } else if(tweetInput.length > 145) {
      $('.too-long').slideDown()
    } else {
      $('.too-short').slideUp(0)
      $('.too-long').slideUp(0)
      $.ajax({
        url:`/tweets`,
        method: 'POST',
        data: tweetInput,
        success: function() {
          addNewTweet();
        }
      })
      $('.tweet-text').val('');
    }
    
  })
  loadTweets()
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

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


