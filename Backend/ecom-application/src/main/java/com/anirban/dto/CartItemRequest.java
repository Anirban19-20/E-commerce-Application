package com.anirban.dto;



public class CartItemRequest {
	private Long productId;
	private Integer quantity;
	public CartItemRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CartItemRequest(Long productId, Integer quantity) {
		super();
		this.productId = productId;
		this.quantity = quantity;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	
}
