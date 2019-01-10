$(document).ready(function() {
  var code1 = {};
  var divArray = [];
  var indexes = [];
  var score = 0;
  var miss = 0;
  var clicks = 0;
  var time;
  generateIndexes();
  insertDivs();

  $(document).on('click', '.card', function(e) {
    e.preventDefault();
    if(clicks == 0) {
      timer();
      scoreMinusTime();
    }
    clicks += 1;
    if($('.flipped').length > 0) {
      var code2 = {};
      let id = $(this).attr('id');
      code2.dataRandom = $(this).attr('data-random');
      code2.id = id;
      checkMathcing(code2);
    } else {
      let dataRandom = $(this).attr('data-random');
      $(this).toggleClass('flipped');
      let id = $(this).attr('id');
      code1.dataRandom = dataRandom;
      code1.id = id;
    }
  });

  function checkMathcing(code2) {
    if(code1.dataRandom == code2.dataRandom && code1.id !== code2.id) {
      $('#'+code1.id).remove();
      $('#'+code2.id).remove();
      score += 2;
      $('#score').html(score);
      endGame();
    } else {
      console.log('aaa');
      $('.card').removeClass('flipped');
      miss += 1;
      $('#miss').html(miss);
      scoreMinus();
    }
  }

  function makeRandomDivs() {
    let random = Math.floor(Math.random() * 1000);
    let id = 'id'+random;
    let div = '<div class="card-container"><div class="card" id="'+id+'-1'+'" data-random="'+random+'"><div class="front">Click</div><div class="back">'+random+'</div></div></div>';
    let div2 = '<div class="card-container"><div class="card" id="'+id+'-2'+'" data-random="'+random+'"><div class="front">Click</div><div class="back">'+random+'</div></div></div>';
    divArray.push(div);
    divArray.push(div2);
  }

  function generateImgs() {
    let array = [];
    for(let i=1; i<=10; i++) {
      array.push(i+'.png');
    }
    let n;
    for (n=0; n<=19; ++n) {
      var i = Math.floor((Math.random() * (19-n)));
      indexes.push(array[i]);
      array[i] = array[19-n];
    }
  }

  function generateIndexes() {
  	let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    let n;
    for (n=0; n<=19; ++n) {
      var i = Math.floor((Math.random() * (19-n)));
      indexes.push(array[i]);
      array[i] = array[19-n];
    }
  }

  function insertDivs() {
    let imgArray = [];
    for(let i=1; i<=10; i++) {
      imgArray.push(i+'.png');
    }
    for(let j=0; j<10; j++) {
      let random = Math.floor(Math.random() * 1000);
      let id = 'id'+random;
      let div = '<div class="card-container"><div class="card" id="'+id+'-1'+'" data-random="'+random+'"><div class="front">Click</div><div class="back"><img src="img/'+imgArray[j]+'"></div></div></div>';
      let div2 = '<div class="card-container"><div class="card" id="'+id+'-2'+'" data-random="'+random+'"><div class="front">Click to</div><div class="back"><img class="card-img" src="img/'+imgArray[j]+'"></div></div></div>';
      divArray.push(div);
      divArray.push(div2);
    }
    var cardContent = document.getElementById('main-container');
    for(let k=0; k<20; k++) {
      cardContent.innerHTML += divArray[indexes[k]];
    }
  }

  function timer() {
    var i = 0;
    var m = 0;
    var h = 0;
    time = setInterval(function() {
      if(i == 59) {
        i = 0;
        $('#sec').html(checkDigits(i));
        if(m == 59) {
          m = 0;
          h += 1;
          $('#min').html(checkDigits(m));
          $('#hour').html(checkDigits(h));
        } else {
          m += 1;
          $('#min').html(checkDigits(m));
        }
      } else {
        i += 1;
        $('#sec').html(checkDigits(i));
      }
    }, 1000);
  }

  function checkDigits(digit) {
    let numDig = /^\d{2}$/;
    let stringDigit = String(digit);
    if(stringDigit.match(numDig)) {
      return stringDigit;
    } else {
      return '0'+stringDigit;
    }
  }

  function scoreMinus() {
    if(parseInt(miss) % 5 == 0) {
      score--;
      $('#score').html(score);
    }
  }

  function scoreMinusTime() {
    let timeout = 2 * 1000 * 60;
    setInterval(function() {
      score--;
      $('#score').html(score);
    }, timeout);
  }

  function endGame() {
    if($('.card').length == 0) {
      let message = '<div id="message_area"><h2 class="message">Game Over! Your Score is: ' +score+ '</h2><h4 class="message">Click here to play again: <button class="play-btn" onclick="return playAgain()">Play Again</button></h4></div>';
      $('#main-container').html(message);
      score = 0;
      miss = 0;
      clicks = 0;
      clearTimeout(time);
      $('#sec').html('');
      $('#min').html('');
      $('#hour').html('');
      $('#score').html('');
      $('#miss').html('');
    }
  }

  $(document).on('click', '.play-btn', function(e) {
    e.preventDefault();
    $('#message_area').remove();
    generateIndexes();
    insertDivs();
  });
});
