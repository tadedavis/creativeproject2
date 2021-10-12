function populateResult(){
let number = Math.random() * (31 - 1) + 1;
url = "https://www.balldontlie.io/api/v1/teams/" + number;
fetch(url)
  .then(function(response) {
    if (response.status != 200) {
      return {
        text: "Error calling the Numbers API service: " + response.statusText
      }
    }
    return response.json();
  }).then(function(json) {
    updateResult("City: " +json.city  +
    " | Conference: " +json.conference +
    " | Division:  " + json.division);
});
}

function onClick(e) {
  e.preventDefault();
  var guess = document.getElementById('guess').value;
  console.log(guess);
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      if(guess === json.full_name || guess === json.name ){
        updateCorrect("Correct");
        populateResult();
        updateAnswer(true);
      }
      else{
        updateCorrect("Wrong");
        updateAnswer(false);
      }
  });
}

function updateResult(info) {
  document.getElementById('result').textContent = info;
}
function updateCorrect(info) {
  document.getElementById('correct').textContent = info;
}
function updateAnswer(info){
  if(info === true){
    console.log("in comparison");
    document.getElementById('answer').innerHTML = "<img src='images/correct.png'/>";
  }
  else{
    document.getElementById('answer').innerHTML = "<img src='images/incorrect.png'/>";
  }
}
var url;
populateResult();
document.getElementById('buttontwo').addEventListener('click', populateResult);
document.getElementById('button').addEventListener('click', onClick);
