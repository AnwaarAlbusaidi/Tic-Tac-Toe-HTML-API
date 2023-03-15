package com.newTTT.TicTacToeGameBoard.service;

import com.newTTT.TicTacToeGameBoard.model.Board;
import org.springframework.stereotype.Service;

import java.util.Random;
@Service
public class Bot {

    public Bot() {
    }

    public int makeRandomMove(Board boardObj) {
        char[][] board = boardObj.getBoard();
        Random rand = new Random();
        int size = board.length;
        int randomRow = rand.nextInt(size);
        int randomCol = rand.nextInt(size);

        while (board[randomRow][randomCol] != '\u0000') {
            // keep generating new random indices until an empty cell is found
            randomRow = rand.nextInt(size);
            randomCol = rand.nextInt(size);
        }

        return randomRow * size + randomCol;
    }
}

