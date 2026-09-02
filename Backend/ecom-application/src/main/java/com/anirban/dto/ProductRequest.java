package com.anirban.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductRequest {

	private String name;
	private String description;
	private BigDecimal price;
	private Integer stockQuantity;
	private String category;
	private String imageUrl;
	private List<String> additionalImages;
	public ProductRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ProductRequest(String name, String description, BigDecimal price, Integer stockQuantity, String category,
			String imageUrl, List<String> additionalImages) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.stockQuantity = stockQuantity;
		this.category = category;
		this.imageUrl = imageUrl;
		this.additionalImages = additionalImages;
	}



	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public Integer getStockQuantity() {
		return stockQuantity;
	}
	public void setStockQuantity(Integer stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<String> getAdditionalImages() {
		return additionalImages;
	}

	public void setAdditionalImages(List<String> additionalImages) {
		this.additionalImages = additionalImages;
	}
	
	
}
