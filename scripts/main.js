'use strict';
const log = console.log;

/* Game starts here */
function startGame(){

    /* QUERY SELECTORS */
    const grid = document.querySelector("#grid");
    const moleHoles = grid.querySelectorAll('.mole-holes');
    const scoreText = document.querySelector(".score-text");
    const missedText = document.querySelector(".missed-text");
    const difficultySpan = document.querySelector(".difficulty-span");
    
    /* Variables */ 
    let   score = 0;
    let   missed = 0;
    let   gameInterval;
    let   activeMole = 0;
    let   currentSpeed = 1;
    let   difficulty = "easy";
    let   clickedOnce = false;

    const HARD_LEVEL = 10;
    const MEDIUM_LEVEL = 5;

    /* Update game speed */
    function updateGameSpeed(){
        
        if (score === MEDIUM_LEVEL){
            clearInterval(gameInterval);
            currentSpeed -= 0.25
            gameInterval = setInterval(setRandomActiveMole, 1000 * currentSpeed);
        }
            
        if (score === HARD_LEVEL){               
            clearInterval(gameInterval);
            currentSpeed -= 0.2
            gameInterval = setInterval(setRandomActiveMole, 1000 * currentSpeed);
        }
    };

    /* Change color with score */
    function changeColor(mole){

        const isActive = mole.classList.contains('active-mole') ;

        if (isActive){
            mole.classList.remove("active-mole");
            mole.classList.remove(difficulty)
            difficultySpan.classList.remove(difficulty);
        };

                
        if (score > MEDIUM_LEVEL) difficulty = "medium";
        
        if(score > HARD_LEVEL) difficulty = "hard";
        
        difficultySpan.classList.add(difficulty);
        difficultySpan.textContent = difficulty;
    };
    /*  */

    /* Function to randomly set a mole as active */
    function setNewRandomActiveMole(moleHoles){
        let randIdx = Math.floor(Math.random() * 9);
        
        while (randIdx === activeMole){
            randIdx = Math.floor(Math.random() * 9);
        };

        activeMole = randIdx;

        moleHoles[randIdx].classList.add("active-mole");
        moleHoles[randIdx].classList.add(difficulty);
    };

    function setRandomActiveMole(){
        
        clickedOnce = false;
        
        const moleHoles = grid.querySelectorAll('.mole-holes');
        const mole = moleHoles[activeMole];

        changeColor(mole);
        updateGameSpeed();
        setNewRandomActiveMole(moleHoles);
    };

    /* Function to check whether clicked hole has mole */
    function checkForMole(){
        if(Number(this.dataset.id) === activeMole) {
           if (!clickedOnce){    
                score++;
                clickedOnce = true;
            }
        }else{
            missed++;
        }
        updateScoreAndMissed();
    };

    /* Function to update score and missed */
    function updateScoreAndMissed(){
        scoreText.textContent = score;
        missedText.textContent = missed;
    };

    /* Function to generate a grid of mole holes */
    function generateGrid(n){
        for(let i = 0; i < n; i++){
            const div = document.createElement('div');
            div.addEventListener('click', checkForMole);
            div.classList.add('mole-holes');
            grid.appendChild(div);
            div.dataset.id = i;
        };
        setRandomActiveMole();
    };
    
    setTimeout(()=>{
        document.querySelector('.start-message').remove();
        generateGrid(9);
        gameInterval = setInterval(setRandomActiveMole, 1000 * currentSpeed);
    }, 1000 * 3);
};

window.addEventListener('load', startGame);