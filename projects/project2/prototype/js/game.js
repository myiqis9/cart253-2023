/**
 * Project 2
 * Viviana Ema Radu
 */

let manager = `title`; //game manager
let activeScene = ``; //active scene, by name

let scenes = []; //scenes in the game - 0-3 are 4 wall sides, 4-9(?) are zoom-ins on interactables
let inventory = []; //player inventory
let activeItem; //held item if player is currently holding one

let leftArrow = {
    x: 50,
    y: height/2,
    image: undefined
}

let rightArrow = {
    x: width-50,
    y: height/2,
    image: undefined
}

let downArrow = {
    x: width/2,
    y: 50,
    image: undefined
}

let player = {
    x: mouseX,
    y: mouseY,
    state: `idle`,
    idleImg: undefined,
    grabImg: undefined,
    moveImg: undefined
}

function preload() {

}


function setup() {
    createCanvas(500, 500);
    setupArrows();
    setupPlayer();
    createScenes();
    createInteractables();
}

function setupArrows() {

}

function setupPlayer() {

}

function createScenes() {

}

function createInteractables() {

}

function draw() {
    switch(manager) {
        case `title`: title();
        break;
        case `opening`: opening();
        break;
        case `game`: game();
        break;
        case `ending`: ending();
    }
}

function title() {
    //insert title here
}

function opening() {
    //might have an opening animation? setting? tutorial? 
    //you wake up in a strange room and it's dark...
    //shadow passes through the window, suddenly lights flicker open?
}

function game() {

}

function ending() {
    //I have no idea what the ending will be like. it's an escape room puzzle, so it's pretty linear... 
    //maybe have a way to get a bad ending early?
}