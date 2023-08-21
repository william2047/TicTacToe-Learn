class Game{
    // Initiates empty board
    // formatt [x][y]
    gameBoard = [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]]

    // Initiates player 'o' always starts first, value will be toggled and gamestate of null (meaning no game is currently playing)
    currentPlayer = 'o'
    gameState = null
    
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

    // Gets an array of all the availible slots on the board
    getEmptySlots = ()=>{
        let emptySlots = []
        for(let x=0; x<=2; x++){
            for(let y=0; y<=2; y++){
                if(this.gameBoard[x][y] == undefined){
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
            
            if(col.every(val => (val === col[0] && val != undefined))){
                return col[0]
            }
            if(row.every(val => (val === row[0]) && (val != undefined))){
                return row[0]
            }
        }

        let diagAsc = this.getDiagonal(true)
        let diagDesc = this.getDiagonal(false)

        if(diagAsc.every(val => (val === diagAsc[0]) && (val != undefined))){
            return diagAsc[0]
        }
        if(diagDesc.every(val => (val === diagDesc[0]) && (val != undefined))){
            return diagDesc[0]
        }

        if(this.getEmptySlots().length == 0){
            return 'tie'
        }

        console.log("ONGOING Game")
        return null
    }

    // Write an empty space with a player on the element board and the data board
    positionWrite = (x,y, player) => {
        this.gameBoard[x][y] = player
        this.boardSlots[x][y].textContent = player
    }

    round = () =>{        
        // Sets defualt starting player
        this.currentPlayer = 'o'
        // Sets the default game State 
        this.gameState = null

        // Function that recurses, calls the next player if the game is still ongoing
        function playerPlay(self){

            if(self.gameState != null){
                console.log('the result is : ',self.gameState)
            }

            else{
                if(self.currentPlayer == 'o'){
                    self.playerOFunction(self.gameBoard).then((position=>{
                        // Writes the position made
                        self.positionWrite(position[0],position[1], 'o')
                        
                        // Updates Data
                        self.gameState = self.getState()
                        self.currentPlayer = 'x'

                        return playerPlay(self)
                    }))
                }
                else{
                    self.playerXFunction(self.gameBoard).then((position=>{
                        // Writes the position made
                        self.positionWrite(position[0],position[1], 'x')
                        
                        // Updates Data
                        self.gameState = self.getState()
                        self.currentPlayer = 'o'

                        return playerPlay(self)
                    }))
                }
            }
        }

        playerPlay(this)
    }


    constructor(playerOFunction, playerXFunction, boardElement){
        this.playerOFunction = playerOFunction
        this.playerXFunction = playerXFunction
        this.boardElement = boardElement


        // Creates an array with corresponding element slots
        console.log(boardElement)
        let boardSlots = [[],[],[]]
        boardElement.querySelectorAll('.board-slot').forEach(boardSlot => {
            boardSlots[boardSlot.getAttribute('x')][boardSlot.getAttribute('y')] = boardSlot
        })
        this.boardSlots = boardSlots

        
        // Initiates round function (can/should be triggered on event rather than constructor)
        this.round()
    }
}