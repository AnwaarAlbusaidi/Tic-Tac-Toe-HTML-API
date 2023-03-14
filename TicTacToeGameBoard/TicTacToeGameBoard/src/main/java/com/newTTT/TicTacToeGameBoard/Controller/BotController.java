package com.newTTT.TicTacToeGameBoard.Controller;

import com.newTTT.TicTacToeGameBoard.model.Board;
import com.newTTT.TicTacToeGameBoard.model.Bot;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bot")
public class BotController {
    private Bot computerOpponent;

    public BotController() {
        this.computerOpponent = new Bot('O');
    }

    @PostMapping
    public int[] getMove(@RequestBody Board gameBoard) {
        return computerOpponent.getMove(gameBoard);
    }
}
