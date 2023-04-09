package com.newTTT.TicTacToeGameBoard.model;

/**
 * The BotResponse class represents the response from the Bot AI player
 * containing the index of the randomly selected cell.
 */
public class BotResponse {

    private int botIndex;

    /**
     * Constructs a BotResponse object with the provided index.
     *
     * @param botIndex the index of the randomly selected cell
     */
    public BotResponse(int botIndex) {
        this.botIndex = botIndex;
    }

    /**
     * Retrieves the index of the randomly selected cell.
     *
     * @return the index of the randomly selected cell
     */
    public int getBotIndex() {
        return botIndex;
    }

    /**
     * Sets the index of the randomly selected cell.
     *
     * @param botIndex the index of the randomly selected cell
     */
    public void setBotIndex(int botIndex) {
        this.botIndex = botIndex;
    }

}
