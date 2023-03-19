package com.newTTT.TicTacToeGameBoard.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;
/**
 The Bot class represents an AI player that makes random moves on a Tic Tac Toe game board.
 */
@Service
public class Bot {

    /**
     * Constructs a Bot object.
     */
    public Bot() {
    }

    /**
     * Makes a random move on the provided Tic Tac Toe game board.
     *
     * @param board a string array representing the Tic Tac Toe game board
     * @return the index of the randomly selected cell
     */
    public int makeRandomMove(String[] board) {
        Random rand = new Random();
        int size = (int) Math.sqrt(board.length);
        int randomIndex = rand.nextInt(board.length);

        while (board[randomIndex] != "") {
            // keep generating new random indices until an empty cell is found
            randomIndex = rand.nextInt(board.length);
        }
        logger.info("Bot index to move: " + randomIndex);
        return randomIndex;
    }

    /**
     * The logger used for debugging and logging information related to the Bot class.
     */
    private static final Logger logger = LoggerFactory.getLogger(Bot.class);
}
