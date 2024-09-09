var candies =["Blue","Orange","Green","Yellow","Red","Purple"];
var board = [];
var rows=9;
var columns = 9;
var score = 0;

// for shwowing when the user enter on browser
window.onload = function(){
    startGame();
}
//ramdom candy creation using candies array
function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}
//for putting the candy in the board when user enters browser
function startGame(){
    for(let r=0;r<rows;r++){
        //image hold array for each row
        let row = [];
        for(let c=0;c<columns;c++){
            //<img> creation  
            let tile = document.createElement("img");
            tile.id= r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            //for appending the image in the board 
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}