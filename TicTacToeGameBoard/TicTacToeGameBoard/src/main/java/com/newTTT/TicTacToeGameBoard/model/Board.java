package com.newTTT.TicTacToeGameBoard.model;

public class Board {
    private char[][] board;

    public Board() {
        board = new char[3][3];
        resetBoard();
    }

    public void resetBoard() {
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                board[row][col] = '-';
            }
        }
    }

    public boolean updateBoard(int row, int col, char symbol) {
        if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] != '-') {
            return false;
        }
        board[row][col] = symbol;
        return true;
    }

    public char getSymbolAt(int row, int col) {
        return board[row][col];
    }

    public boolean isFull() {
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                if (board[row][col] == '-') {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean hasWon(char symbol) {
        // check rows
        for (int row = 0; row < 3; row++) {
            if (board[row][0] == symbol && board[row][1] == symbol && board[row][2] == symbol) {
                return true;
            }
        }

        // check columns
        for (int col = 0; col < 3; col++) {
            if (board[0][col] == symbol && board[1][col] == symbol && board[2][col] == symbol) {
                return true;
            }
        }

        // check diagonals
        if (board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol) {
            return true;
        }
        if (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol) {
            return true;
        }

        return false;
    }
}
