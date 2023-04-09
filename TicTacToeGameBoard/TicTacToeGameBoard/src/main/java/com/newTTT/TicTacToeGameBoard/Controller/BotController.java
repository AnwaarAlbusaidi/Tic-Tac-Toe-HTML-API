package com.newTTT.TicTacToeGameBoard.Controller;

import com.newTTT.TicTacToeGameBoard.model.Board;
import com.newTTT.TicTacToeGameBoard.model.BotResponse;
import com.newTTT.TicTacToeGameBoard.service.Bot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/BotMove")
@CrossOrigin(origins = "*", allowedHeaders = "*")
/**
 The BotController class represents the REST API endpoint for the Bot AI player to make
 a random move on a Tic Tac Toe game board.
 */
public class BotController {

    @Autowired
    private Bot botPlayer;

    /**
     * Makes a random move on the provided Tic Tac Toe game board using the Bot AI player.
     *
     * @param board the Tic Tac Toe game board
     * @return the index of the randomly selected cell as a BotResponse object
     */
    @PostMapping
    public BotResponse makeRandomMove(@RequestBody Board board) {
        int index = botPlayer.makeRandomMove(board.getBoard());
        BotResponse botResponse = new BotResponse(index);
        return botResponse;
    }

}
