var divArray = [];
var indexes = [];
generateIndexes();
insertDivs();

function makeRandomDivs() {
  let random = Math.floor(Math.random() * 1000);
  let div = '<div class="cards"><div class=" card-back" data-random="'+random+'"></div></div>';
  let div2 = '<div class="cards"><div class=" card-back" data-random="'+random+'"></div></div>';
  divArray.push(div);
  divArray.push(div2);
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
  for(let j=0; j<10; j++) {
    makeRandomDivs();
  }
  var cardContent = document.getElementById('card-content');
  for(let i=0; i<20; i++) {
    cardContent.innerHTML += divArray[indexes[i]];
  }
}
