package com.newTTT.TicTacToeGameBoard.Controller;

import com.newTTT.TicTacToeGameBoard.model.Board;
import com.newTTT.TicTacToeGameBoard.service.Bot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BotController {

    @Autowired
    private Bot botPlayer;

    @PostMapping("/random-move")
    public int makeRandomMove(@RequestBody Board board) {
        int index = botPlayer.makeRandomMove(board);
        return index;
    }
}
