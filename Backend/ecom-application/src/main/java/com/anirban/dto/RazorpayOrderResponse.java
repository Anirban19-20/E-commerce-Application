package com.anirban.dto;

public class RazorpayOrderResponse {

    private String orderId;
    private String currency;
    private Integer amount;

    public RazorpayOrderResponse() {}

    public RazorpayOrderResponse(
            String orderId,
            String currency,
            Integer amount) {

        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
    }

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}
    
    
    
}