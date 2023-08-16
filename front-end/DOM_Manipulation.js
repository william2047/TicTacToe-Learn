const mainDiv = document.querySelector('#mainContainer')

class Page{
    
    constructor(content){
        this.element = content
    }

    changeTo = () => {
        mainDiv.innerHTML = this.element
    }


}

let main = new Page(
`<h1>Tic Tac Toe</h1>
<nav>
    <ul class="menuButtons">
        <li><button class="menuButton" id="singlePlayer">Single Player</button></li>
        <li><button class="menuButton comingSoon" id="multiPlayer">Multiplayer</button></li>
        <li><button class="menuButton comingSoon" id="settings">Settings</button></li>
    </ul>
</nav>`,)




main.changeTo()