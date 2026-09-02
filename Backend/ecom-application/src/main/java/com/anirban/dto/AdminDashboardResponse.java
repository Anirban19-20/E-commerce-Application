package com.anirban.dto;

import java.math.BigDecimal;

public class AdminDashboardResponse {

    private long totalProducts;
    private long totalUsers;
    private long totalOrders;
    private BigDecimal totalRevenue;

    public AdminDashboardResponse() {
    }

    public AdminDashboardResponse(
            long totalProducts,
            long totalUsers,
            long totalOrders,
            BigDecimal totalRevenue) {

        this.totalProducts = totalProducts;
        this.totalUsers = totalUsers;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}