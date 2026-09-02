package com.anirban.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductResponse {
	private String id;
	private String name;
	private String description;
	private BigDecimal price;
	private Integer stockQuantity;
	private String category;
	private String imageUrl;
	private List<String> additionalImages;
	private Boolean active;
	public ProductResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ProductResponse(String id, String name, String description, BigDecimal price, Integer stockQuantity,
			String category, String imageUrl, List<String> additionalImages, Boolean active) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.stockQuantity = stockQuantity;
		this.category = category;
		this.imageUrl = imageUrl;
		this.additionalImages = additionalImages;
		this.active = active;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	
	
}
