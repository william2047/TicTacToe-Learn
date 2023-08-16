class Game{
    // Initiates empty board
    // formatt [x][y]
    gameBoard = [[],[],[]]

    // Player 'o' always starts first, value will be toggled
    currentPlayer = 'o'
    
    // Logs a formated board to console
    logGameBoard = () => {
        for(let y=0; y<=2; y++){
            let rowStr = ''
            for(let x=0; x<=2; x++){
                rowStr += this.gameBoard[x][y] + ' '
            }
            console.log(rowStr)
        }
    }

    // Gets array containing corresponding column (from left to right)
    getColumn = (x) =>{
        return this.gameBoard[x]
    }

    // Gets array containing corresponding row (from top to bottom)
    getRow = (y) =>{
        let col = []
        this.gameBoard.forEach((column) => {
            col.push(column[y])
        })
        return col
    }

    // Gets array containing corresponding row. isAsc: true for 0 to 2, false for 2 to 0.
    getDiagonal = (isAsc)=>{
        let diag = []

        if(isAsc){
            this.gameBoard.forEach((column, i)=>{
                diag.push(column[i])
            })
        }
        else{
            this.gameBoard.forEach((column, i)=>{
                diag.push(column[-i + 2])
            })
        }
        return diag
    }

    getEmptySlots = ()=>{
        let emptySlots = []
        for(let x=0; x<=2; x++){
            for(let y=0; y<=2; y++){
                if((y in this.gameBoard[x]) == false){
                    emptySlots.push([x,y])
                }
            }
        }
        return emptySlots
    }

    // Returns the state of the board: 'x', if X player wins; 'o', if O player wins; null, if game is still ongoing; 'tie', if game ended with no winner
    getState = () => {

        for(let i=0; i<=2; i++){
            let col = this.getColumn(i)
            let row = this.getRow(i)
            
            if(col.every(val => val === col[0])){
                return col[0]
            }
            if(row.every(val => val === row[0])){
                return row[0]
            }
        }

        let diagAsc = this.getDiagonal(true)
        let diagDesc = this.getDiagonal(false)

        if(diagAsc.every(val => val === diagAsc[0])){
            return diagAsc[0]
        }
        if(diagDesc.every(val => val === diagDesc[0])){
            return diagDesc[0]
        }

        if(this.getEmptySlots().length == 0){
            return 'tie'
        }

        return null
    }

    // Write an empty space with a player
    positionWrite = (x,y, player) => {
        if(this.gameBoard[x][y] == undefined){
            this.gameBoard[x][y] = player
        }
    }
}

export function Round(player1PlayFunction, player2PlayFunction, isPlayer1First, gameBoardElement){
    let isPlaying = true

    game = new Game()

    while(isPlaying){
        // if it is player1's turn, make a move with player 1 function else, make a move with player 2 function
        if(isPlayer1First){
            game.positionWrite(player1PlayFunction(game.board))
        }
        else{
            game.positionWrite(player1PlayFunction(game.board))
        }

        // cjec
        if(game.getState() != null){
            isPlaying =false
        }
    }
}

test = new Game()

test.getEmptySlots()