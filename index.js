//selecting all the required elements
const selectBox = document.querySelector(".selectbox"),
selectXbtn = selectBox.querySelector(".options .playerX"),
selectObtn = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".playboard"),
players = document.querySelector(".players"),
allbox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".resultbox"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

//After selecting team
window.onload = ()=>{
    //adding onclick attirbute in all the grids or available
    for (let i = 0; i < allbox.length; i++) { 
        allbox[i].setAttribute("onclick", "clickedBox(this)");
         }

    selectXbtn.onclick = ()=>{
        selectBox.classList.add("hide"); //after player X is selected the page gets hidden 
        playBoard.classList.add("show"); //the main game page will appear
    }

    selectObtn.onclick = ()=>{
        selectBox.classList.add("hide"); //after player O is selected the page gets hidden 
        playBoard.classList.add("show"); //the main game page will appear
        players.setAttribute("class", "players active play"); //slider moves to O part & adding three class
    }
}

let playerXIcon = "fas fa-times"; // icons for the cross sign from fontawesome
let playerOIcon = "far fa-circle"; //icons for the circle sign from fontawesome
let playerSign = "X"; //suppose the player is X
let runBot = true;


//user clicked function
function clickedBox(element){
    if(players.classList.contains("play")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon when user clicks
        players.classList.add("active");
        //if player sign selected is O then the value of player sign is stored as O
        playerSign = "O"; 
        element.setAttribute("id", playerSign);
    }
    else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon when user clicks
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); //select the winner function 
    playBoard.style.pointerEvents = "none"; //once user selected they can't select until the bot selects
    element.style.pointerEvents = "none"; //once a box is selected it can't be reselected
    let randomDelayTime = ((Math.random() * 1000) +200).toFixed(); //generating random time to delay after we give our sign during match
    setTimeout(()=> {
    bot(runBot); //calling bot function
    }, randomDelayTime); //passing random delay time
}

//bot click function
function bot(runBot){
    if(runBot){ //if runbot is true then run the following data
        //first change the playersign so that bot chooses the opposite sign
    playerSign="O";
    let array = []; //creating empty array for the unselected ones
    for (let i = 0; i < allbox.length; i++) {
        if(allbox[i].childElementCount == 0){ //if box is not filled
            array.push(i); //inserting unclicked boxes into the array
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random indexes drom array
    if(array.length > 0){
        if(players.classList.contains("play")){ //setting the bot to give opposite sign
        allbox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon when user clicks
        players.classList.remove("active");
        //if user is O then the box id value will be X
        playerSign = "X";
        allbox[randomBox].setAttribute("id", playerSign);
    }
    else{
        allbox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon when user clicks
        players.classList.remove("active");
        allbox[randomBox].setAttribute("id", playerSign);
    }
    selectWinner(); //select the winner function
}  
allbox[randomBox].style.pointerEvents = "none"; //once bot used a box user cannot click or make any changes
playBoard.style.pointerEvents = "auto"; //once user selected they can't select until the bot selects
playerSign = "X"; //passing the X value
}
}

// winning page
function getClass(idname){
    return document.querySelector(".box" + idname).id; //returning id name
}

function checkClass(val1, val2, val3, sign){
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){ //settimg the combination for winner
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
       console.log("Player " + playerSign + " is the winner");
       //once match won by some one stop the bot
       runBot = false;
       bot(runBot);
       setTimeout(() =>{
           playBoard.classList.remove("show");
           resultBox.classList.add("show");
       }, 700); //delay to show the result box by 700 milliseconds

       wonText.innerHTML = `Player ${playerSign} won the match!`;
    }

    else{
        //if the match is a draw
        //first we will check if all span has id and no one has won the game
       if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
        runBot = false;
        bot(runBot);
        setTimeout(() =>{
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
       }, 700); //delay to show the result box by 700 milliseconds

       wonText.textContent = `Draw Match!`;
    }
}
}

replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page
}
