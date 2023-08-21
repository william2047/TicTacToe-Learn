async function SelectSlotPlay(gameBoard=null){

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
