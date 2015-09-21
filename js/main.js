$(function(){

  var snakePosition_left;
  var snakePosition_top;
  var snakeBody = [];
  var snakeBodyLength = 15;
  var extramove;

  // Add roundTo method for multiple of 20
  Number.prototype.roundTo = function(num) {
    var resto = this%num;
    if (resto <= (num/2)) { 
        return this-resto;
    } else {
        return this+num-resto;
    }
  }

  initiate();
  bindEvents();
  var food = showFood();

  // Initiate snake position
  function initiate(){

    snakePosition_left = 0;
    snakePosition_top = 0 ;

    if (snakeBodyLength > 15) {
      for (var i = 16; i <= snakeBodyLength; i++) {
        $('.snakeBody-' + i).remove();
      }
    }
    snakeBodyLength = 15;

    $('.snakeHead').css({
      "top":snakePosition_top + "px",
      "left": snakePosition_left +"px"
    });

    for (var i = 1; i <= snakeBodyLength ; i++) {
      snakeBody[i] = {};
      snakeBody[i].top = 0;
      snakeBody[i].left = 0;
      $('.snakeBody-'+i).css({
        "top":0 + "px",
        "left":0 + "px",
      });
    }
  }

  // Define the snake continuous movement and check impacts
  function movement(direction,move){
    window.clearInterval(extramove);

    snakeBody[1].left = snakePosition_left;
    snakeBody[1].top = snakePosition_top;

    if (direction === "left") {

      snakePosition_left  = snakePosition_left + move;
      $('.snakeHead').css(direction,snakePosition_left + "px");
      eatFood();
      extramove = setInterval(function() { movement(direction,move); }, 300);

       // Test Impacts
      bodyImpact(snakePosition_left,snakePosition_top,snakeBody);
      borderImpact(snakePosition_left);

    } else if (direction === "top") {

      snakePosition_top  = snakePosition_top + move;
      $('.snakeHead').css(direction,snakePosition_top + "px");
      eatFood();
      extramove = setInterval(function() { movement(direction,move); }, 300);

      // Test Impacts
      bodyImpact(snakePosition_left,snakePosition_top,snakeBody);
      borderImpact(snakePosition_top);
    }

    $('.snakeBody-1').css({
      "top":snakeBody[1].top + "px",
      "left":snakeBody[1].left + "px"
    });

    for (var i = snakeBodyLength; i > 1; i--) {
      snakeBody[i].top = snakeBody[i-1].top;
      snakeBody[i].left = snakeBody[i-1].left;
      $('.snakeBody-'+i).css({
        "top":snakeBody[i].top + "px",
        "left":snakeBody[i].left + "px",
        "z-index": snakeBodyLength - (i - 1)
      });

    }
  }

  // Check Border Impact
  function borderImpact(position){
    if (position === 600 || position < 0 ) {
      impactAlert();
    }
  }

  //Check Snake Belly impact
  function bodyImpact(head_left,head_top,body){
    for (var i = 1; i <= snakeBodyLength ; i++) {
      if ( head_top === snakeBody[i].top && head_left === snakeBody[i].left) {
        impactAlert();
      }
    }
  }

  // Display Impact Message & Reset
  function impactAlert() {
    $("#impact-popup").fadeIn('fast');

    // Reinitiate the snake position and movement
    initiate();
    window.clearInterval(extramove);
  }

  function bindEvents() {
    // Remove impact popup on Return / Click  
    $(document).on('keydown', function(e){
      if ( e.keyCode === 13 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        $("#impact-popup").fadeOut('fast');
      }
    });
    $(document).on("click", function() {
      $("#impact-popup").fadeOut('fast');
    });
  }
   
  // Action when a direction key is pressed, Snake movement
  function keyAction(limit, direction, posCheck, movementLength) {
    if (direction >= limit) {
      movement(posCheck,movementLength);
      bodyImpact(snakePosition_left,snakePosition_top,snakeBody);
    } else {
      impactAlert();
    }
  }

  // Snake keyboard move
  $(document).keydown(function(e) {
    if (e.which === 37) {
      keyAction(20, snakePosition_left, "left",-20);
    } else if (e.which === 38) {
      keyAction(20, snakePosition_top, "top",-20);
    } else if (e.which === 39) {
      keyAction(snakePosition_left, 560, "left",20);
    } else if (e.which === 40) {
      keyAction(snakePosition_top, 560, "top",20);
    }
  });

  // Add food to the game
  function addFood() {
    var newFood = {
      top: rdmNumber(),
      left: rdmNumber()
    }
    for (var i = 1; i <= snakeBodyLength ; i++) {
      if ( newFood.top === snakeBody[i].top && newFood.left === snakeBody[i].left) {
        addFood();
      }
    }
    return newFood;
  }

  // Show Food
  function showFood() {
    var food = addFood();
    $(".main").append('<span class="food" style="left: ' + food.left + 'px;top: ' + food.top + 'px"></span>');
    return food;
  }

  // Create a random number between 0 and 580, multiple of 20
  function rdmNumber() {
    var number = Math.floor((Math.random() * 580));
    return number.roundTo(20);
  }

  // Action when the snake eat the food
  function eatFood() {
    if ( food.top === snakePosition_top && food.left === snakePosition_left) {
        $(".food").remove();
        snakeBodyLength++;
        $(".main").append('<div class="snakeBody snakeBody-' + snakeBodyLength + '"></div>');
        snakeBody[snakeBodyLength] = {};
        snakeBody[snakeBodyLength].top = snakeBody[snakeBodyLength - 1].top;
        snakeBody[snakeBodyLength].left = snakeBody[snakeBodyLength - 1].left;
        $('.snakeBody-'+snakeBodyLength).css({
          "top":snakeBody[snakeBodyLength - 1].top + "px",
          "left":snakeBody[snakeBodyLength - 1].left + "px",
        });
        food = showFood();
      }
  }

});