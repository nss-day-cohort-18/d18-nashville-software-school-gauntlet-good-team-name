"use strict";

console.log("main.js linked");

let Tools = require("./weapons.js"),
    Combatants = require("./player.js"),
    SpellBook = require("./spells.js"),
    GuildHall = require('./classes.js'),
    Enemies = require('./enemies.js'),
    CreatePlayer = require('./createplayer.js'),
    StartCombat = require('./startcombat.js');

let classChoosen, 
    weaponChoosen,
    createdPlayer,
    createdEnemy;

$(document).ready(function() {
  $("#player-setup").show();
});

$(".card__link").click( (e) => {
  handleSetup(e);
});

function handleSetup (e) {
    var nextCard = $(e.currentTarget).attr("next");
    var playerName = $("#player-name").val();
    var moveAlong = false;

    // start loop: if nextCard is EQUAL to an <a next="card--X"> go to next 
    switch (nextCard) {

      case "card--class":
        moveAlong = ($("#player-name").val() !== "");

        $('.class__link').click(function() {
          classChoosen = $(this).attr('id');
          console.log('handleSetup: card--card: You choose the class:', classChoosen);
        });

        break;

      case "card--weapon":
        moveAlong = (classChoosen !== undefined);

        $('.weapon__link').click(function() {
          weaponChoosen = $(this).attr('id');
          console.log('handleSetup: card--weapon: You choose the weapon: ', weaponChoosen);
        });

        break;

      case "card--battleground":
        moveAlong = (weaponChoosen !== undefined);

        createdPlayer = CreatePlayer.createPlayer(playerName, classChoosen, weaponChoosen);

          let playerStats =
            '<br />' + 'name: ' + createdPlayer.playerName +
            '<br />' + 'class: ' + createdPlayer.class.name +
            '<br />' + 'weapon: ' + createdPlayer.weapon.name +
            '<br />' + 'species: ' + createdPlayer.species +
            '<br />' + 'health: ' + createdPlayer.health +
            '<br />' + 'intelligence: ' + createdPlayer.intelligence;
            $('.playerStats').append(playerStats);

        createdEnemy = Enemies.createEnemy();

          let enemyStats =
            '<br />' + 'name: ' + createdEnemy.playerName +
            '<br />' + 'class: ' + createdEnemy.class.name +
            '<br />' + 'weapon: ' + createdEnemy.weapon.name +
            '<br />' + 'species: ' + createdEnemy.species +
            '<br />' + 'health: ' + createdEnemy.health +
            '<br />' + 'intelligence: ' + createdEnemy.intelligence;
            $('.enemyStats').append(enemyStats);

        break;

      case "card--runbattle":
        moveAlong = true;

        StartCombat.playerVersusEnemy(createdPlayer, createdEnemy);

        $('#playagain').click( () => {
          console.log('not yet');
          /* we need to create a new instance of obj or values will be the same... below code doesn't work
          createdPlayer = CreatePlayer.createPlayer(playerName, classChoosen, weaponChoosen);
          createdEnemy = Enemies.createEnemy();
          StartCombat.playerVersusEnemy(createdPlayer, createdEnemy);
          */
        });

        break;

    }

    /* When True: Set Class 'Card' to Hide (hides everything)
       Then Specifically Set the Class with the a.next to Show. */
    if (moveAlong) { 
      $(".card").hide();
      $("." + nextCard).show();
    } else {
      console.log('Set a Name or Pick a Class or Pick a Weapon');
    }

    $(".card__back").click(function() {
      var previousCard = $(this).attr("previous");
      $(".card").hide();
      $("." + previousCard).show();
    });

}

function showPlayerStats() {
  var outputPlayerStats = document.getElementsByClassName("playerStats");
}

function showEnemyStats() {
  var outputEnemyStats = document.getElementsByClassName("enemyStats");
}

/*
  Test code to generate a human player and an orc player
 */


// var warrior = new Combatants.Human();
// warrior.setWeapon(new Tools.WarAxe());
// warrior.generateClass();  // This will be used for "Surprise me" option
// console.log(warrior.toString());
/*
  Test code to generate a spell
 */
// var spell = new SpellBook.Sphere();
// console.log("spell: ", spell.toString());
// 
