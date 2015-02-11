$(function(){

  var snakePosition_left;
  var snakePosition_top;
  var belly = {};

  initiate();

// Initiate Zero Data
  function initiate(){

    snakePosition_left = 0;
    snakePosition_top = 0 ;

    $('.snake').css({
        "top":snakePosition_top + "px",
        "left": snakePosition_left +"px"
    });

    for (var i = 1; i <= 15 ; i++) {
        belly[i] = {};
        belly[i]["top"] = 0;
        belly[i]["left"] = 0;
        $('.belly-'+i).css({
            "top":0 + "px",
            "left":0 + "px",
        });
    };
}


var extramove;

// Movement Continous
function movement(direction,move){
    window.clearInterval(extramove);

    belly[1]["left"] = snakePosition_left;
    belly[1]["top"] = snakePosition_top;

    if (direction == "left") {

        snakePosition_left  = snakePosition_left + move;

        // Test Impacts
        if ( bodyImpact(snakePosition_left,snakePosition_top,belly) == false ){
            return;
        };
        if ( borderImpact(snakePosition_left) == false ){
            return;
        };

        $('.snake').css(direction,snakePosition_left + "px");
        extramove = setInterval(function () {movement(direction,move)}, 300);

    } else if (direction == "top") {
        snakePosition_top  = snakePosition_top + move;

        // Test Impacts
        if ( bodyImpact(snakePosition_left,snakePosition_top,belly) == false ){
            return;
        };
        if ( borderImpact(snakePosition_top) == false ){
            return;
        };

        $('.snake').css(direction,snakePosition_top + "px");
        extramove = setInterval(function () {movement(direction,move)}, 300);
    };


    $('.belly-1').css({
        "top":belly[1]["top"] + "px",
        "left":belly[1]["left"] + "px"
    });

    for (var i = 15; i > 1; i--) {
        belly[i]["top"] = belly[i-1]["top"];
        belly[i]["left"] = belly[i-1]["left"];
        $('.belly-'+i).css({
            "top":belly[i]["top"] + "px",
            "left":belly[i]["left"] + "px",
            "z-index": 15 - (i-1)
        });

    };
}

// Check Border Impact
function borderImpact(direction){
    if (direction == 600 || direction < 0 ) {
        alert('Game Over');
        console.log('Border IMPACT !!!!');
        initiate();
        return false;
    }
}

//Check Snake Belly impact
function bodyImpact(head_left,head_top,body){
for (var i = 1; i <= 15 ; i++) {
     if ( head_top == belly[i]["top"] && head_left == belly[i]["left"]) {
        alert('Game Over');
        console.log('Body IMPACT !!!!');
        initiate();
        return false;
     };
    };
}



// Snake keyboard move
$(document).keydown(function(e) {
    switch(e.which) {

        //Left Arrow
        case 37: 
        if (snakePosition_left >= 20) {
            movement("left",-20);
            bodyImpact(snakePosition_left,snakePosition_top,belly);
        }else{
            alert('Game Over');
            console.log('Border IMPACT !!!!');
            initiate();
            window.clearInterval(extramove);
            return;
        }
        break;

        //Up Arrow
        case 38: 
        if (snakePosition_top >= 20) {
            movement("top",-20);
            bodyImpact(snakePosition_left,snakePosition_top,belly);

        }else{
            alert('Game Over');
            console.log('Border IMPACT !!!!');
            initiate();
            window.clearInterval(extramove);
            return;
        };
        break;

        //Right Arrow
        case 39: 
        if (snakePosition_left <= 560) {
            movement("left",20);
            bodyImpact(snakePosition_left,snakePosition_top,belly);
        }else{
            alert('Game Over');
            console.log('Border IMPACT !!!!');
            initiate();
            window.clearInterval(extramove);
            return;
        };
        break;

        //Down Arrow
        case 40: 
        if (snakePosition_top <= 560) {
            movement("top",20);
            bodyImpact(snakePosition_left,snakePosition_top,belly);
        }else{
            alert('Game Over');
            console.log('Border IMPACT !!!!');
            initiate();
            window.clearInterval(extramove);
            return;
        };
        break;

        default: return;
    }
    e.preventDefault();
});



});