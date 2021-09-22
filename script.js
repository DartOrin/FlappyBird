'use strict';

// Объявление переменных

const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

    //Картинки
    const bg    = new Image();
    const bird  = new Image();
    const fg    = new Image();
    const pipe1 = new Image();
    const pipe2 = new Image();

    //Звуки

    const fly = new Audio();
    const score = new Audio();

// Присваивание
    // Картинки
    bg.src      = 'images/bg.png'; 
    bird.src    = 'images/bird.png'; 
    fg.src      = 'images/fg.png';   
    pipe1.src   = 'images/pipeNorth.png';
    pipe2.src   = 'images/pipeSouth.png';

    //Звуки

    fly.src     = 'sounds/fly.mp3';
    score.src   = 'sounds/score.mp3';

document.addEventListener('keydown', flyUp);

function flyUp(){
    fly.play();
    posY -= 30;
}

let pipes = [];
pipes[0] = {
    x : cvs.width,
    y : 0
};

let posX    = 20;
let posY    = 150;
let padding = 90;
let padding2 = 0;
let gravity = 1;


function drawGame(){
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipes.length; i++){

        padding2 = pipe1.height + padding;

        ctx.drawImage(pipe1, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipe2, pipes[i].x, pipes[i].y + pipe1.height + padding);
        pipes[i].x--;

        if(pipes[i].x == 10){
            pipes.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipe1.height) - pipe1.height
            });
        }

        if(posX + bird.width >= pipes[i].x
            && posX <= pipes[i].x + pipe1.width
            && (posY <= pipes[i].y + pipe1.height  
            || posY + bird.height >= pipes[i].y + padding2 
            || posY + bird.height >= cvs.height - fg.height)) {
            location.reload();
        }

        if(pipes[i].x == 10){
            score.play();
        }

    }

    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, posX, posY);
    posY += gravity;
    requestAnimationFrame(drawGame);
}

pipe2.onload = drawGame;


