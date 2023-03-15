package com.newTTT.TicTacToeGameBoard.model;

public class BotResponse {

    private int botIndex;

    public BotResponse(int botIndex) {
        this.botIndex = botIndex;
    }


    public int getBotIndex() {
        return botIndex;
    }

    public void setBotIndex(int botIndex) {
        this.botIndex = botIndex;
    }
}
