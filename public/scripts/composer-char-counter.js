// Add a $(document).ready() funciton to your file to ensure DOM has loaded
$(document).ready(function() {
  // --- our code goes here ---
  console.log(this);
});

$(".tweet-button").on('click', function() {
  console.log(this); //The this keyword is a reference to the button
});

$(".tweet-button").on('click', () => {
  console.log(this); //The this keyword here refers to something else!
});

$(".tweet-text").keyup(displayCount);
$(".tweet-text").keydown(displayCount);
function displayCount() {
  var counter = 140 - $(this).val().length;
  if (counter < 0) {
    $($('.counter').text(counter)).css("color", "red")
  } else {
    $($('.counter').text(counter)).css("color", "")
  }  
}