// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 5, 4, 3, 2, 1, 2, 4, 5, 5];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  
var guessCounter = 0;
var roundsCompleted = 0;//number of rounds completed to keep track of high score
var clueHoldTime = 1000;
var numOfMistakes = 0;
var timeRemaning = 30
var setIntervalTime = 0;
var audio = "piano" //default audio Type
var buttonsToGeneratePattern = 5; //default amount of buttons, used to determine randomPattern 
var givenRoundAmount = 6;//round to complete depending on diffculty
var givenTimeAmount = 30;//seconds given depending on diffculty
var mode = "normal"
var highScore = 0;
function startGame(){
 
  resetVariables();
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("roundsCompletedText").classList.remove("hidden");
  document.getElementById("afterGameText").classList.add("hidden");
  addHearts();
  randomPattern();
  playClueSequence();
  document.getElementById("gameButtonAreaBelow").disabled = true;
  console.log(setIntervalTime + "what");
}

function randomPattern(){
  for(let i = 0; i < givenRoundAmount ; i++){
    pattern[i] = Math.floor(Math.random() * buttonsToGeneratePattern) + 1;
  }
}

function stopGame(){
  clearInterval(setIntervalTime);
  timeRemaning = givenTimeAmount;
  updateTimer();
  gamePlaying = false;
  updateHighScore();
  removeHearts();
  removeWaitandGo();
  enableButtons();
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("roundsCompletedText").classList.add("hidden");
  document.getElementById("afterGameText").classList.remove("hidden");
}
 
// Sound Synthesis Functions
const freqMap = {
  1: 261.5,
  2: 329.5,
  3: 392,
  4: 466.2,
  5: 522,
  6: 588,
  7: 620,
  8: 670
}

const aracdeAudio = {
  1:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/audioButton1.mp3?v=1648672212131',
  2:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/audioButton2.mp3?v=1648671852651',
  3:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/audioButton3.mp3?v=1648671857439',
  4:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/audioButton4.mp3?v=1648671859943',
  5:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/audioButton5.mp3?v=1648672214379',
  6:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/arcade6.mp3?v=1648766503567',
  7:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/arcade7.mp3?v=1648766508085',
  8:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/rayquaza.mp3?v=1648766853640'
}

//also known as "pokemonAudio"
const animalAudio = {
  1:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/pika.mp3?v=1650512780058',
  2:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/squrtle.mp3?v=1650512746422',
  3:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/charmandar.mp3?v=1650512749637',
  4:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/bulba.mp3?v=1650512756254',
  5:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/gengar.mp3?v=1650512759381',
  6:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/arcade8.mp3?v=1648766513839',
  7:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/snorlax.mp3?v=1650512773651',
  8:'https://cdn.glitch.global/7ae64d65-2a75-40ea-b631-5f797d099a09/lucario.mp3?v=1650512776753'
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying && audio == "piano"){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
  else if ( audio == "arcade"){
    startArcade(btn);
  }
  else if (audio == "animal"){
    startAnimal(btn);
    
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying)
    {
      if(audio == "piano"){
        lightButton(btn);
        playTone(btn,clueHoldTime);
        setTimeout(clearButton,clueHoldTime,btn);
      }
      else if (audio == "arcade"){
        lightButton(btn);
        startArcade(btn);
        setTimeout(clearButton,clueHoldTime,btn);
      }
      else{ //audio is animal
        lightButton(btn);
        startAnimal(btn);
        setTimeout(clearButton,clueHoldTime,btn);
        }
    }
 
}

function playClueSequence(){
  context.resume()
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  clueHoldTime = clueHoldTime > 100 ? clueHoldTime - 90 : clueHoldTime;
  disableButtons();
  timeRemaning = givenTimeAmount;
  updateTimer();
   
  document.getElementById('roundsCompletedBold').innerHTML = roundsCompleted;
  document.getElementById("waitSign").classList.remove("hidden");
  document.getElementById("goSign").classList.add("hidden");
  stopTimer();
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  setTimeout(enableButtons, delay - cluePauseTime);
  setTimeout(switchWaitandGo, delay - cluePauseTime);
  setTimeout(startTimer, delay- cluePauseTime);
}

function disableButtons(){
    console.log("buttons disabled")
  for(let i = 1; i <= buttonsToGeneratePattern; i++){
  document.getElementById("button" + i).setAttribute("onclick", "");
  document.getElementById("button" + i).setAttribute("onmousedown", "");
  document.getElementById("button" + i).setAttribute("onmouseup", "");
  }
}
function enableButtons(){
  console.log("buttons enabled")
  for(let i = 1; i <= buttonsToGeneratePattern; i++){
   document.getElementById("button" + i).setAttribute("onclick", "guess("+i+")");
  document.getElementById("button" + i).setAttribute("onmousedown", "startTone(" + i + ")");
  document.getElementById("button" + i).setAttribute("onmouseup", "stopTone(" + i + ")");
  }
}
 
//lose after 3 tries
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

//win 8 rounds
function winGame(){
  document.getElementById('roundsCompletedBold').innerHTML = roundsCompleted;
  updateHighScore();
  stopGame();
  alert("Congratulations. You won!");
 
}
//lose running out of time
function outOfTime(){
  stopGame();
  alert("Uh Oh! Out of Time! You Lost!");

}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  // add game logic here
  if(pattern[guessCounter] == btn){
    if(guessCounter == progress){
      if(progress == givenRoundAmount - 1){
        roundsCompleted++;
        winGame();
      }else{
        progress++;
        roundsCompleted++;
        playClueSequence();
      }
    }else{
      guessCounter++;
    }
  }else{
    numOfMistakes++;
    if(numOfMistakes > 2){
      document.getElementById("heart3").classList.add("hidden")
      loseGame(); //On the third mistake, lose game
    }
    else{
      alert("Incorrect guess, try again. " + (3 - numOfMistakes) + " attempt remaining.");
      
      if(numOfMistakes == 1){
        document.getElementById("heart1").classList.add("hidden")
      }
      else{
        document.getElementById("heart2").classList.add("hidden") 
      }
      
      playClueSequence();
    }
     
  }
}

function updateTimer() {
  document.getElementById('timer').innerHTML = timeRemaning;
  timeRemaning--;
  if(timeRemaning < -1){
    outOfTime();
  }
}

//implemented audio
function switchAudio(audioType){
  if(gamePlaying) { return; }
  
  switchPictures(audioType);
  
  if(audioType == "piano")
    {
      audio = "piano"
      document.getElementById("animalAudio").classList.add("hidden");
      document.getElementById("pianoAudio").classList.remove("hidden");
    }
  else if(audioType == "arcade")
    {
      audio = "arcade"
      document.getElementById("pianoAudio").classList.add("hidden");
      document.getElementById("arcadeAudio").classList.remove("hidden");
    }
  else //audioType is animal
    {
      audio = "animal"
      document.getElementById("arcadeAudio").classList.add("hidden");
      document.getElementById("animalAudio").classList.remove("hidden");
    }
}

//change button pictures based on audio selection  
function switchPictures(theme){
  let previousTheme = "animal";
  if(theme == "animal")
    {
      previousTheme = "arcade";
    }
  else if(theme == "arcade")
    {
      previousTheme = "piano";
    }
  
  for(let i = 1 ; i < 9 ; i++)
    {
      document.getElementById("button" + i).classList.remove(previousTheme);
      document.getElementById("button" + i).classList.add(theme);
    }
}

function startArcade(btn) {
  let audio = new Audio(aracdeAudio[btn]);
  audio.play();
  tonePlaying = true
}

function startAnimal(btn) {
  let audio = new Audio(animalAudio[btn]);
  audio.play();
  tonePlaying = true
}
 

//number of buttons
function switchButtons(numOfButtons){
  if(gamePlaying) { return; }
  
  buttonsToGeneratePattern = numOfButtons;
  
  if (numOfButtons == 5){
    //changes display of buttons to equal number amount 
    document.getElementById("button6").classList.add("hidden");
    document.getElementById("button7").classList.add("hidden");
    document.getElementById("button8").classList.add("hidden");
    
    //rotates the "number of buttons" button next to the audio button
    document.getElementById("rotateButton8").classList.add("hidden");
    document.getElementById("rotateButton5").classList.remove("hidden");
 
  }
  else if (numOfButtons == 6){
    document.getElementById("button6").classList.remove("hidden");
    
    document.getElementById("rotateButton5").classList.add("hidden");
    document.getElementById("rotateButton6").classList.remove("hidden");
  }
  else if (numOfButtons == 7){
    document.getElementById("button6").classList.remove("hidden");
    document.getElementById("button7").classList.remove("hidden");
    
    document.getElementById("rotateButton6").classList.add("hidden");
    document.getElementById("rotateButton7").classList.remove("hidden");
  }
  else{ // numOfButtons ==8
    document.getElementById("button6").classList.remove("hidden");
    document.getElementById("button7").classList.remove("hidden");
    document.getElementById("button8").classList.remove("hidden");
    
    document.getElementById("rotateButton7").classList.add("hidden");
    document.getElementById("rotateButton8").classList.remove("hidden");
  }
  
}

//remove hearts from display if game is not in game
function removeHearts(){
    document.getElementById("heart1").classList.add("hidden");
    document.getElementById("heart2").classList.add("hidden");
    document.getElementById("heart3").classList.add("hidden");
  }

//add heart images when game is in play
function addHearts(){
    document.getElementById("heart1").classList.remove("hidden");
    document.getElementById("heart2").classList.remove("hidden");
    document.getElementById("heart3").classList.remove("hidden");
  }


//dark mode and light mode
function switchMode(mode){
  if(mode == "infinite") {return;}
  var background = document.body;
  background.classList.toggle("dark-mode");
  
  if(mode == "dark"){
    document.getElementById("lightMode").classList.add("hidden");
    document.getElementById("darkMode").classList.remove("hidden");
  }
  else{ // mode is "light"
    document.getElementById("darkMode").classList.add("hidden");
    document.getElementById("lightMode").classList.remove("hidden");
  }
}

//wait and go imgs
function removeWaitandGo(){
  console.log("remove")
    document.getElementById("goSign").classList.add("hidden");
    document.getElementById("waitSign").classList.add("hidden");
}

function switchWaitandGo(){
  if(!gamePlaying) {return;}
  document.getElementById("waitSign").classList.add("hidden");
  document.getElementById("goSign").classList.remove("hidden");
}

//stops timer between rounds
function stopTimer(){
  clearInterval(setIntervalTime);
}

//start timer after clue sequence 
function startTimer(){
  if(!gamePlaying) {return;}
  setIntervalTime = setInterval(updateTimer,1000); 
}
 
function switchDifficulty(newDifficulty){
  if(gamePlaying) {return;}
  
  var background = document.body;
  if(newDifficulty == "easy"){
    background.classList.toggle("infinte-mode");
    mode = "normal";
    document.getElementById("easyMode").classList.remove("hidden");
    document.getElementById("infiniteMode").classList.add("hidden");
    
    givenRoundAmount = 6;
    givenTimeAmount = 30;
    document.getElementById('roundAmount').innerHTML = givenRoundAmount;
    document.getElementById('timeAmount').innerHTML = givenTimeAmount;
  }
  else if(newDifficulty == "medium"){
    document.getElementById("mediumMode").classList.remove("hidden");
    document.getElementById("easyMode").classList.add("hidden");

    givenRoundAmount = 8;
    givenTimeAmount = 15;
    document.getElementById('roundAmount').innerHTML = givenRoundAmount;
    document.getElementById('timeAmount').innerHTML = givenTimeAmount;
  }
  else if (newDifficulty == "hard") {
    document.getElementById("hardMode").classList.remove("hidden");
    document.getElementById("mediumMode").classList.add("hidden"); 
    
    givenRoundAmount = 10;
    givenTimeAmount = 10;
    document.getElementById('roundAmount').innerHTML = givenRoundAmount;
    document.getElementById('timeAmount').innerHTML = givenTimeAmount;   
  }
  else{
    document.getElementById("infiniteMode").classList.remove("hidden");
    document.getElementById("hardMode").classList.add("hidden"); 
    
    givenRoundAmount = 100;
    givenTimeAmount = 10;
    mode = "infinite"
    document.getElementById('roundAmount').innerHTML = 100;
    document.getElementById('timeAmount').innerHTML = givenTimeAmount;  
    background.classList.toggle("infinte-mode");
  }
 
  timeRemaning = givenTimeAmount;
  updateTimer();
}

 function updateHighScore(){
   highScore = ((roundsCompleted) > highScore) ? roundsCompleted : highScore;
   document.getElementById('highScore').innerHTML = highScore;
 }

function resetVariables(){
  progress = 0;
  roundsCompleted = 0;
  gamePlaying = true;
  clueHoldTime = 1000; 
  numOfMistakes = 0;
}