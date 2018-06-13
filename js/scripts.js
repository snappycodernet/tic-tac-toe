function Player(name) {
  this.name = name;
  this.difficulty = "";
  this.mark = "";
  this.turn = false;
  this.selections = [];
}

function Board(coordinates) {
  this.coordinates = coordinates;
  this.whoGoesFirst = "";
  this.lastMarkPlaced = "";
}

Board.prototype.determineWhoGoesFirst = function(player1, player2) {
  var coinFlip = Math.floor((Math.random() * 2) + 1);
  console.log("Coin Flip: " + coinFlip);
  if (coinFlip === 1) {
    player1.turn = true;
    this.whoGoesFirst = player1.name;
  } else {
    player2.turn = true;
    this.whoGoesFirst = player2.name;
  }
  this.announceTurn();
}

Board.prototype.announceTurn = function() {
  return console.log(this.whoGoesFirst + " goes first!");
}

Board.prototype.placeMark = function(player, coordinate) {
  this.coordinates[coordinate] = player.mark;
  player.selections.push(coordinate);
  this.lastMarkPlaced = coordinate;
  this.checkForWin();
}

Board.prototype.checkForWin = function(player1, player2) {
  // horizontal three of a kind A1 A2 A3 ... C1 C2 C3
  // vertical three of a kind A1 B1 C1 ... A3 B3 C3
  // diagonal one of a kind A1 B2 C3 / C1 B2 A3
  if (this.checkWinConditions(player1)) {
    console.log("win!");
  }
}

Board.prototype.checkWinConditions = function(player) {
  var result = false;
  var counter = 0;
  var horiz1 = ["a1", "a2", "a3"];
  var horiz2 = ["b1", "b2", "b3"];
  var horiz3 = ["c1", "c2", "c3"];
  var vert1 = ["a1", "b1", "c1"];
  var vert2 = ["a2", "b2", "c2"];
  var vert3 = ["a3", "b3", "c3"];
  var diag1 = ["a1", "b2", "c3"];
  var diag2 = ["c1", "b2", "a3"];
  var winConditions = [horiz1, horiz2, horiz3, vert1, vert2, vert3, diag1, diag2];

  for(var i = 0; i < winConditions.length; i++) {
    console.log(winConditions[i]);
    if (counter >= 3) {
      console.log("Current i: " + i);
      console.log("Counter: " + counter);
      return true;
    } else {
      counter = 0;
    }
    for(j = 0; j < winConditions[j].length; j++) {
      console.log(winConditions[i][j]);
      for(k = 0; k < player.selections.length; k++) {
        if (winConditions[i][j].includes(player.selections[k])) {
          counter++;
        }
      }
    }
  }
}

Board.prototype.checkArrayValues = function(array, selections) {
  var counter = 0;
  for(var i = 0; i < array.length; i++) {
    if (array.includes(selections[i])) counter++;
  }
  return this.checkCounter(counter);
}

Board.prototype.checkCounter = function(counter) {
  if (counter === 3) return true;
}

function Coordinate() {
  this.a1 = false;
  this.a2 = false;
  this.a3 = false;
  this.b1 = false;
  this.b2 = false;
  this.b3 = false;
  this.c1 = false;
  this.c2 = false;
  this.c3 = false;
}

var player1 = new Player("Abel");
var player2 = new Player("Computer");
var coordinates = new Coordinate();
var gameBoard = new Board(coordinates);
