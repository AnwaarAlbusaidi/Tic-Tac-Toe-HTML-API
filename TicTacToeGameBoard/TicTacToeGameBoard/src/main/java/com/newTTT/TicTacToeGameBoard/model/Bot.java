package com.newTTT.TicTacToeGameBoard.model;

import java.util.Random;

public class Bot{
    private char symbol;
    private Random random;

    public Bot(char symbol) {
        this.symbol = symbol;
        this.random = new Random();
    }

    public int[] getMove(Board gameBoard) {
        int[] move = new int[2];
        boolean foundMove = false;

        // Check for a winning move
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                if (gameBoard.getSymbolAt(row, col) == '-') {
                    gameBoard.updateBoard(row, col, symbol);
                    if (gameBoard.hasWon(symbol)) {
                        move[0] = row;
                        move[1] = col;
                        foundMove = true;
                    }
                    gameBoard.updateBoard(row, col, '-');
                }
                if (foundMove) {
                    break;
                }
            }
            if (foundMove) {
                break;
            }
        }

        // Block opponent's winning move
        if (!foundMove) {
            char opponentSymbol = (symbol == 'X') ? 'O' : 'X';
            for (int row = 0; row < 3; row++) {
                for (int col = 0; col < 3; col++) {
                    if (gameBoard.getSymbolAt(row, col) == '-') {
                        gameBoard.updateBoard(row, col, opponentSymbol);
                        if (gameBoard.hasWon(opponentSymbol)) {
                            move[0] = row;
                            move[1] = col;
                            foundMove = true;
                        }
                        gameBoard.updateBoard(row, col, '-');
                    }
                    if (foundMove) {
                        break;
                    }
                }
                if (foundMove) {
                    break;
                }
            }
        }

        // Choose a random move
        if (!foundMove) {
            while (true) {
                int row = random.nextInt(3);
                int col = random.nextInt(3);
                if (gameBoard.updateBoard(row, col, symbol)) {
                    move[0] = row;
                    move[1] = col;
                    break;
                }
            }
        }

        return move;
    }
}

