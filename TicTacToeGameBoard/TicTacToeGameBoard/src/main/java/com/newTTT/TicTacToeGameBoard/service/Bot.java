package com.newTTT.TicTacToeGameBoard.service;

import com.newTTT.TicTacToeGameBoard.model.Board;
import org.springframework.stereotype.Service;

import java.util.Random;
@Service
public class Bot {

    public Bot() {
    }

    public int makeRandomMove(String[] board) {
        Random rand = new Random();
        int size = (int) Math.sqrt(board.length);
        int randomIndex = rand.nextInt(board.length);

        while (board[randomIndex] != "") {
            // keep generating new random indices until an empty cell is found
            randomIndex = rand.nextInt(board.length);
        }

        return randomIndex;
    }

}

