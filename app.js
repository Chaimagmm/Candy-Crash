document.addEventListener('DOMContentLoaded' , () =>{
    const grid  = document.querySelector('.grid')
    const width = 8
    const squares = []
    const scoreDisplay = document.getElementById('score')
    let score = 0
    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
    ]

    //Create Board
    function CreateBoard(){
        for(let i=0; i < width*width ; i++){
            const square = document.createElement('div')
            //to give us the ability to move the small divs
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            // get a random number from 0 to 5 to display it inside the div
            let randomColor = Math.floor(Math.random() * candyColors.length)
            //the bg color of the small divs will be got from the candyVolors
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    CreateBoard()

    //Drag the cansies
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

    function dragStart(){
colorBeingDragged = this.style.backgroundImage
squareIdBeingDragged = parseInt(this.id)
console.log(colorBeingDragged)
       console.log(this.id, 'dragstart')
    }

    function dragEnd(){
        console.log(this.id, 'dragend')
     //what is a valid move ?
let valideMoves = [squareIdBeingDragged - 1 , 
    squareIdBeingDragged - width , 
    squareIdBeingDragged + 1, 
    squareIdBeingDragged + width]
    //if the id of the square being replaced included in the validemoves  : validemove = true
    let valideMove = valideMoves.includes(squareIdBeingReplaced)
    
    if(squareIdBeingReplaced && valideMove){
          squareIdBeingReplaced = null
    }else if(squareIdBeingReplaced && !valideMove){
squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }else{
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    }
    }

    function dragOver(e){
        e.preventDefault()
        console.log(this.id, 'dragover')
    }

    function dragEnter(e){
        e.preventDefault()
        console.log(this.id, 'draenter')
    }

    function dragLeave(){
        console.log(this.id, 'dragleave')
    }

    function dragDrop(){
        //to store the color and the id of the dropped square
        colorBeingReplaced = this.style.backgroundImage
        //we use parseInt to ensure that the id is a number
        squareIdBeingReplaced = parseInt(this.id)
        console.log(this.id, 'dragdrop')
        //we change the colors of the two squares
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }
//Drop the candies when some have been cleared
function moveDown(){
    for(i = 0 ; i < 55 ; i++){
        if(squares[i+width].style.backgroundImage === ''){
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0,1,2,3,4,5,6,7]
            //if i is the first row we make isFirstRow = true
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && squares[i].style.backgroundImage === ''){
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
}
    //Checking for matches
   
//Check for row of four
function checkRowForFour(){
    //60 since we stop in the last 4 element from the last line
    for(let i = 0 ; i < 60 ; i++){
let rowOfFour = [i , i+1 , i+2 , i+3]
let decidedColor = squares[i].style.backgroundImage
const isBlank = squares[i].style.backgroundImage === ''
//same logic
const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46.47,53,54,55]
if(notValid.includes(i)) continue


if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
score +=4
scoreDisplay.innerHTML = score
rowOfFour.forEach(index => {squares[index].style.backgroundImage = ''
   })
 }
}
}
checkRowForFour()
//Check for column of four
function checkColumnForFour(){
    
    for(let i = 0 ; i < 47 ; i++){
let columnOfFour = [i , i+width , i+width*2, i+width*3]
let decidedColor = squares[i].style.backgroundImage
const isBlank = squares[i].style.backgroundImage === ''

if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
score +=4
scoreDisplay.innerHTML = score
columnOfFour.forEach(index => {squares[index].style.backgroundImage = ''
   })
 }
}
}
checkColumnForFour()
 //Check for row of three
 function checkRowForThree(){
    //61 since we stop in the last 3 element from the last line
    for(let i = 0 ; i < 61 ; i++){
let rowOfThree = [i , i+1 , i+2]
let decidedColor = squares[i].style.backgroundImage
const isBlank = squares[i].style.backgroundImage === ''
// to avoid invalid row of three which can strats in a line and ends in the next line (like: 6,7,8)
const notValid = [6,7,14,15,22,23,30,31,38,39,46.47,54,55]
if(notValid.includes(i)) continue

if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
score +=3
scoreDisplay.innerHTML = score
rowOfThree.forEach(index => {squares[index].style.backgroundImage = ''
   })
 }
}
}
checkRowForThree()
//Check for column of three
function checkColumnForThree(){
    //47 since we stop in the last 3 element from the last down-column
    for(let i = 0 ; i < 47 ; i++){
let columnOfThree = [i , i+width , i+width*2]
let decidedColor = squares[i].style.backgroundImage
const isBlank = squares[i].style.backgroundImage === ''

if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
score +=3
scoreDisplay.innerHTML = score
columnOfThree.forEach(index => {squares[index].style.backgroundImage = ''
   })
 }
}
}
checkColumnForThree()
window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
},100)
})
