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
        generateCandy();
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
    //candies will not be swapped if they are blank (edge case)
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
 function crushCandy() {
    let needToSlide = false;
    
    do {
        needToSlide = false;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                if (board[r][c].src.includes("Striped-Horizontal")) {
                    activateStripedCandy(r, c, "horizontal");
                    needToSlide = true;
                } else if (board[r][c].src.includes("Striped-Vertical")) {
                    activateStripedCandy(r, c, "vertical");
                    needToSlide = true;
                }
            }
        }
        
        if ( crushFour() || crushThree()) {
            needToSlide = true;
        }
        
        if (needToSlide) {
            slideCandy();
            generateCandy();
        }
    } while (needToSlide);

    document.getElementById("score").innerText = score;
}
 function crushThree(){
    let crushed = false
    //check rows
    for(let r = 0;r<rows;r++){
        for(let c=0;c<columns -2 ;c++) // columns -2 because we have to check 3 candies
        {
            let candy1 = board[r][c];
            let candy2 = board [r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank") && !candy1.src.includes("Striped")){
                candy1.src = "/images/blank.png";
                candy2.src = "/images/blank.png";
                candy3.src = "/images/blank.png";
                score+=20;
                crushed = true;
            }
        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r< rows-2; r++){
            let candy1= board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank") && !candy1.src.includes("Striped")){
                candy1.src = "/images/blank.png";
                candy2.src = "/images/blank.png";
                candy3.src = "/images/blank.png";
                score+=20;
                crushed = true;
            }
        }
    }
    return crushed;
 }
 
 //crushing 4 candies
 function crushFour(){
    //check rows
    let crushed = false;
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            let candy1= board[r][c];
            let candy2= board[r][c+1];
            let candy3=board[r][c+2];
            let candy4=board[r][c+3];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank") && !candy1.src.includes("Striped")){
                // Get the color of the matched candies from the src
                let color = candy1.src.split("/").pop().split(".")[0]; //extracting color name from "/images/blue.png"
                console.log(`Crushing candies with color: ${color}`);
                color = color.charAt(0).toUpperCase() + color.slice(1); // Capitalize first letter
    // Replace candy1 with a special striped candy of the same color
                candy1.src = "/images/" + color + "-Striped-Horizontal.png";
                candy2.src = "/images/blank.png";
                candy3.src = "/images/blank.png";
                candy4.src = "/images/blank.png";
                score+=40;
                crushed = true;
            }
        }
    }
    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-3;r++){
            let candy1= board[r][c];
            let candy2= board[r+1][c];
            let candy3=board[r+2][c];
            let candy4=board[r+3][c];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank") && !candy1.src.includes("Striped")  ){
                 //get the color of the matched candies from the src
            let color = candy1.src.split("/").pop().split(".")[0];
            //replace candy1 with a special striped vertical candy of the same color
            color = color.charAt(0).toUpperCase() + color.slice(1); 
               candy1.src = "/images/" + color + "-Striped-Vertical.png";
                candy2.src = "/images/blank.png";
                candy3.src = "/images/blank.png";
                candy4.src = "/images/blank.png";
                score+=40;
                crushed = true;
            }
        }
    }

 }

 function checkValid(){
    //check for 3 candy rows
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
        //check for 4 candy rows 
        for(let c=0;c<columns-3;c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")){
                return true;
        }
    }
}
//check for 4 candy rows 

    //check for 3 candy columns
    for(let c=0;c<columns;c++){
        for(let r=0;r< rows-2; r++){
            let candy1= board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
               return true;
            }
        }
        //check for 4 candy columns
        for(let r=0;r<rows-3;r++){
            let candy1=board[r][c];
            let candy2= board[r+1][c];
            let candy3=board[r+2][c];
            let candy4=board[r+3][c];
            if(candy1.src ==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")){
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
        for(let r= rows-1 ;r>=0; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind-=1;
            }
        }
        for(let r=ind;r>=0;r--){
            board[r][c].src = "/images/blank.png";
        }
    }
 }
 
 function generateCandy(){
    for(let c=0;c<columns;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src="/images/" + randomCandy() + ".png";
        }
    }
 }
 function activateStripedCandy(r, c, direction) {
    if (direction === "horizontal") {
        for (let i = 0; i < columns; i++) {
            board[r][i].src = "/images/blank.png";
            score += 40;
        }
    } else if (direction === "vertical") {
        for (let i = 0; i < rows; i++) {
            board[i][c].src = "/images/blank.png";
            score += 40;
        }
    }
}