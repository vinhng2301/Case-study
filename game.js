import {update as updateSnake, snake_die as die, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeHitObs} from "./snake.js";
import {update as updateFood, draw as drawFood} from './food.js'
import { outsideGrid } from "./grid.js";
import {update as updateObstacle, draw as drawObstacle, getObstacle, resetObs} from './obsticle.js';

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver) {
        if( confirm ('You lost. Try again?')){
            die();
            draw();
            resetObs();
            window.requestAnimationFrame(main)
            gameOver = false;
        } return;
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender =( currentTime - lastRenderTime ) / 500
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateObstacle(updateFood())
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawObstacle(gameBoard)
}


function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || snakeHitObs(getSnakeHead(),getObstacle())
}