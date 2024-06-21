function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }

function displayWinner(timerId){
    clearTimeout(timerId);
    if(player.health === enemy.health){
        document.querySelector("#displayText").innerHTML = "tie!";
    } else if (player.health > enemy.health){
        document.querySelector("#displayText").innerHTML = "P1 wins!";
    } else if (player.health < enemy.health){
        document.querySelector("#displayText").innerHTML = "P2 wins!";
    }
    document.querySelector("#displayText").style.display = "flex";
}

let timer = 60;
let timerId;
function decreaseTimer(){
    if (timer > 0){
        --timer;
        document.querySelector("#timer").innerHTML = timer;
        timerId = setTimeout(decreaseTimer, 1000);
    }

    //determine winner when finished
    if(timer === 0){
        displayWinner(timerId);
    }
}