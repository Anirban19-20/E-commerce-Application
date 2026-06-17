package com.anirban.dto;

public class RazorpayOrderResponse {

    private String orderId;
    private String currency;
    private Long amount;

    public RazorpayOrderResponse() {}

    public RazorpayOrderResponse(
            String orderId,
            String currency,
            Long amount) {

        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getCurrency() {
        return currency;
    }

    public Long getAmount() {
        return amount;
    }
}