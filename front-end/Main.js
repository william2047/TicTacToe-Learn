const mainDiv = document.querySelector('#mainContainer')

class Page{
    
    constructor(content){
        console.log(this)

        this.element = document.createElement('div')
        this.element.id = 'pageContainer'

        this.element.innerHTML = content

        function processElement(self, element) {
            
            if(element.id != ''){
                self[element.id + 'Element'] = element
            }
        
            // Iterate over its children
            Array.from(element.children).forEach(child => {
                processElement(self, child);
            });
        }

        processElement(this, this.element)
    }

    changeTo = () => {
        mainDiv.innerHTML = ''
        mainDiv.append(this.element)
    }


}

let main = new Page(
`<h1>Tic Tac Toe</h1>
<nav>
    <ul class="menuButtons">
        <li><button class="menuButton" id="singleplayer">Singleplayer</button></li>
        <li><button class="menuButton comingSoon" id="multiPlayer">Multiplayer</button></li>
        <li><button class="menuButton comingSoon" id="settings">Settings</button></li>
    </ul>
</nav>`)




let board = new Page(
`<div id="gameBoard">
    <div id="board-line-row-1" class="board-line board-line-row"></div>
    <div id="board-line-row-2" class="board-line board-line-row"></div>
    <div id="board-line-column-1" class="board-line  board-line-column"></div>
    <div id="board-line-column-2" class="board-line  board-line-column"></div>

    <div x="0" y="0" class="board-slot"></div>
    <div x="1" y="0" class="board-slot"></div>
    <div x="2" y="0" class="board-slot"></div>
    <div x="0" y="1" class="board-slot"></div>
    <div x="1" y="1" class="board-slot"></div>
    <div x="2" y="1" class="board-slot"></div>
    <div x="0" y="2" class="board-slot"></div>
    <div x="1" y="2" class="board-slot"></div>
    <div x="2" y="2" class="board-slot"></div>
</div>`)



// main.changeTo()

// Main menu buttons to go to game mode
main.singleplayerElement.addEventListener('click', ()=>{
    board.changeTo()
})



board.changeTo()


let game = new Game(SelectSlotPlay, SelectSlotPlay, document.querySelector('#gameBoard'))