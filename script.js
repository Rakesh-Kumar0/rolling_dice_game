document.addEventListener("DOMContentLoaded", function(){
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const rollBtn = document.getElementById('rollBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const diceImagesrc = document.getElementById('diceImageSrc');
    const winnerMessage = document.getElementById('winnerMessage');
    const noOfRound = document.getElementById('round');
    const playNextRoundBtn = document.getElementById('playNextRoundBtn');
    const playerOnePoints = document.getElementById('playerOnePoints');
    const playerTwoPoints = document.getElementById('playerTwoPoints');

    let currentPlayer = 1;
    let winner = null;
    let round = 1;
    let wins = [0, 0];

    rollBtn.addEventListener("click", rollDice);
    playAgainBtn.addEventListener("click", playAgain);
    playNextRoundBtn.addEventListener("click", playNextRound);

    function rollDice(){
        if(!winner){
            // Generate a random dice value between 1 and 6
            const diceValue = Math.floor(Math.random()*6)+1;
            // Create the path to the corresponding dice image;
            const diceImage = './assets/dice-${diceValue}.png';
            // Set the src attribute of the dice image element to display the rolled dice
            diceImagesrc.attributes.src.textContent = diceImage;

            // Change the background colors of the players' panels based on the current player
            if(currentPlayer == 1){
                player1.style.backgroundColor = "#7a236075";
                player2.style.backgroundColor = "#581845";
            }
            else{
                player1.style.backgroundColor = "#581845";
                player2.style.backgroundColor = "#7a236075"
            }
            // Check if the rolled dice value is 6
            if(diceValue == 6){
                // Mark the current player as the winner of the round
                winner = currentPlayer;
                // Update the wins array based on the current player
                winner === 2 ? (wins = [wins[0], wins[1] + 1]) : (wins = [wins[0] + 1, wins[1]]);
                // Check if either player has won 2 or more rounds and call the checkWinnerFun if true
                if(wins[0] >=2 || wins[1] >=2) return checkWinnweFun();

                // If the round is not the last one (less than 3), proceed to the next steps
                if(round < 3){
                    // Update the points
                    updatePointsFun();
                    // Display a message indicating the winner of the round and round number
                    winnerMessage.textContent = 'player ${winner} win round ${round} 🔥';
                    // Display the button to play the next round and hide the roll button.
                    playNextRoundBtn.style.display = "flex";
                    rollBtn.style.display = "none";
                    // Increment the round counter
                    round +=1;
                }
            }
            // Switch to the next player for the next turn
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }

    // This function updates the points display based on the winner of the current round.
    function updatePointsFun(){
        // Check if the winner is Player 1
        if(winner == 1){
            // Display a checkmark symbol for Player 1 on the current round's points tracker
            playerOnePoints.children[round -1].textContent = "✔️";
            playerTwoPoints.children[round -1].textContent = "❌";

            // Set the background color of the points tracker cells to transparent
            playerOnePoints.children[round -1].style.backgroundColor = "transparent";
            playerTwoPoints.children[round -1].style.backgroundColor = "transparent";
        }
        // Check if the winner is Player 1
        if(winner == 2){
            // Display a checkmark symbol for Player 1 on the current round's points tracker
            playerOnePoints.children[round -1].textContent = "❌";
            playerTwoPoints.children[round -1].textContent = "✔️";
            // Set the background color of the points tracker cells to transparent
            playerOnePoints.children[round -1].style.backgroundColor = "transparent";
            playerTwoPoints.children[round -1].style.backgroundColor = "transparent";
        }
    }


    // This function resets the points display for both players at the start of a new game.
    function resetPoints(){
        // Loop through the points tracker for each player (3 rounds)
        for(let i=0; i<3;i++){
            // Clear the text content to remove symbols (resetting points)
            playerOnePoints.children[i].textContent = " ";
            playerTwoPoints.children[i].textContent = " ";
            // Set the background color of the points tracker cells to the initial color
            playerOnePoints.children[i].style.backgroundColor = "#89256b";
            playerTwoPoints.children[i].style.backgroundColor = "#89256b";
        }
    }
});