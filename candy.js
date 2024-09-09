var candies =["Blue","Orange","Green","Yellow","Red","Purple"];
var board = [];
var rows=9;
var columns = 9;
var score = 0;

var currTile; //candy being dropped
var otherTile; //candy on which the user is dropping
// for shwowing when the user enter on browser
window.onload = function(){
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
    },100);
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
            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); // click on a candy,initialize drag process
            tile.addEventListener("dragover", dragOver); // clicking on candy,moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); // dragging candy over another candy
            tile.addEventListener("dragLeave",dragLeave); // leave candy over another candy
            tile.addEventListener("drop",dragDrop);//dropping candy over another candy
            tile.addEventListener("dragend",dragEnd); //after drag process completed,we swap candies
            //for appending the image in the board 
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}
 function dragStart(){
 //this refers to tile that was clicked on for dragging
 currTile = this;
  
 }
 function dragOver(e){
    e.preventDefault();
 }
 function dragEnter(e){
    e.preventDefault();
 }
 function dragLeave(){
 }
 function dragDrop() {
    //this refers to target tile that was dropped on  
    otherTile = this;
 }
 //swap candies using their src
 function dragEnd(){
    //candies will not be swapped if they are blank
    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }
    //checking adjancy so that only left,right,top,below are crushed
    let currCords= currTile.id.split("-"); //id-"0-0" -> ["0","0"]
    let r = parseInt(currCords[0]);
    let c = parseInt(currCords[1]);
    let otherCords = otherTile.id.split("-");
    let r2 = parseInt(otherCords[0]);
    let c2 = parseInt(otherCords[1]);
    let moveLeft = c2 ==c-1 && r==r2;
    let moveRight = c2 == c+1 && r==r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src= currImg;

        let validMove = checkValid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src= currImg;
        }
    }
 }
 function crushCandy(){
    //crushFive() have to implement
    //crushFor() will implement soon
    crushThree();
 }
 function crushThree(){
    //check rows
    for(let r = 0;r<rows;r++){
        for(let c=0;c<columns -2 ;c++) // columns -2 because we have to check 3 candies
        {
            let candy1 = board[r][c];
            let candy2 = board [r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "/images/blank.png";
                candy2.src = "/images/blank.png";
                candy3.src = "/images/blank.png";
            }
        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r< rows-2; r++){
            let candy1= board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "/images/blank.png";
                candy2.src = "/images/blank.png";
                candy3.src = "/images/blank.png";
            }
        }
    }
 }

 function checkValid(){
    for(let r = 0;r<rows;r++){
        for(let c=0;c<columns -2 ;c++) // columns -2 because we have to check 3 candies
        {
            let candy1 = board[r][c];
            let candy2 = board [r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                return true;
            }
        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r< rows-2; r++){
            let candy1= board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
               return true;
            }
        }
    }
    return false;
    
 }

 //slide candy down
 function slideCandy(){
    for(let c=0; c<columns;c++){
        let ind=rows-1;
        for(let r= columns-1 ;r>=0; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind+=1;
            }
        }
        for(let r=ind;r>=0;r--){
            board[r][c].src = "/images/blank.png";
        }
    }
 }