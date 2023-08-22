// Player function for local client
async function selectSlotPlay(gameBoard=null){

    function waitForButtonEvent(){
        return new Promise((resolve)=>{
    
            // callback function returns position of slot, and remove event listeners from elements
            function eventLogic(event){
                let slot = event.srcElement
        
                board.element.querySelectorAll('.board-slot').forEach((slot) =>{
                    slot.removeEventListener('click', eventLogic)
                })
        
                resolve([slot.getAttribute('x'),slot.getAttribute('y')])
            }
    
            // adds call back function to event listener
            board.element.querySelectorAll('.board-slot').forEach((slot) =>{
                slot.addEventListener('click', eventLogic)
            })
        })
    }   

    return waitForButtonEvent()
}


async function minMaxServerless(gameBoard){

    let gameBoardFormatted = JSON.stringify([['o', null, null],[null, null, null],[null, null, null]])


    console.log(gameBoardFormatted)

    fetch('https://xblb81ggs6.execute-api.ca-central-1.amazonaws.com/default/TicTacToe_MinMax',{
        method: 'POST',
        body: gameBoardFormatted
    })
    .then(response=> response.json())
    .then((response=>{
        return response
    }))
}