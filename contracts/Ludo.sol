// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Ludo{
    Games public gameState;
    address public player1;
    address public player2;
    address public currentplayer;
    uint8 public diceResult;
    

    constructor(address _player1, address _player2) {
        player1 = _player1;
        player2 = _player2;
        currentPlayer = _player1; 
        gameState = GameState.NotStarted;
    }


    function startGame() public {
        require(gameState == GameState.NotStarted, "Game already started ");
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        gameState = GameState.InProgress;
    }

    function rollDice() public {
        require(gameState == GameState.InProgress, "Game is not in progress");
        require(msg.sender == currentPlayer, "It's not your turn");
        gameState = GameState.InProgress;
}

    function rollDice() public {
        require(gameState == GameState.InProgress, "Game is not in progress");
        require(msg.sender == currentPlayer, "It's not your turn");

        
        diceResult = _generateRandomNumber() % 6 + 1;

        
        currentPlayer = (currentPlayer == player1) ? player2 : player1;
    }
     function getGameState() public view returns (GameState) {
        return gameState;
    }
      function getCurrentPlayer() public view returns (address) {
        return currentPlayer;
    }
}