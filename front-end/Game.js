class Game{
    // Initiates empty board
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

    // Returns the state of the board: 'x', if X player wins; 'o', if O player wins; null, if no one wins 
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

        return null
    }

    // Write an empty space with a player
    positionWrite = (x,y, player) => {
        if(this.gameBoard[x][y] == undefined){
            this.gameBoard[x][y] = player
        }
    }
}