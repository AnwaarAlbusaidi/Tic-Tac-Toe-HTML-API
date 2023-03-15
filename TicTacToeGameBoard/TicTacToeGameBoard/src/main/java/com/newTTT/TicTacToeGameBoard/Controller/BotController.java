package com.newTTT.TicTacToeGameBoard.Controller;

import com.newTTT.TicTacToeGameBoard.model.Board;
import com.newTTT.TicTacToeGameBoard.model.BotResponse;
import com.newTTT.TicTacToeGameBoard.service.Bot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/BotMove")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BotController {

    @Autowired
    private Bot botPlayer;

    @PostMapping
    public BotResponse makeRandomMove(@RequestBody Board board) {
        int index = botPlayer.makeRandomMove(board.getBoard());
        BotResponse botResponse = new BotResponse(index);
        return botResponse;
    }
}
