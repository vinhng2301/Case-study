
import {RandomGridPosition} from "./grid.js";
import {onSnake} from "./snake.js";

let arr_obs = [];



export function update(foodOnSnake) {
    if (foodOnSnake) {
       let obstacle = getRandomObstaclePosition();
        arr_obs.push(obstacle)
    }
}


export function draw(gameBoard) {
    for (let i=0; i < arr_obs.length; i++) {
        let obsElement = document.createElement('div')
        obsElement.style.gridRowStart = arr_obs[i].y
        obsElement.style.gridColumnStart = arr_obs[i].x
        obsElement.classList.add('obstacle')
        gameBoard.appendChild(obsElement)
    }
}



function getRandomObstaclePosition() {
    let newObstaclePosition
    while (newObstaclePosition == null || onSnake(newObstaclePosition)) {
        newObstaclePosition = RandomGridPosition()
    }
    return newObstaclePosition
}

export function getObstacle() {
    return arr_obs
}

export function resetObs() {
    arr_obs = []
}