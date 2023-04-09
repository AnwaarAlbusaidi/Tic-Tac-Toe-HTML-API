package com.newTTT.TicTacToeGameBoard.model;
/**
 The Board class represents the Tic Tac Toe game board.
 */
public class Board {
     String[] board;

    public Board() {
    }

    /**
     * Retrieves the current state of the Tic Tac Toe game board.
     *
     * @return the current state of the Tic Tac Toe game board
     */
    public String[] getBoard() {
        return board;
    }

    /**
     * Sets the state of the Tic Tac Toe game board.
     *
     * @param board the new state of the Tic Tac Toe game board
     */
    public void setBoard(String[] board) {
        this.board = board;
    }
}
