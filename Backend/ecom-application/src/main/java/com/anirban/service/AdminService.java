package com.anirban.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anirban.dto.AdminDashboardResponse;
import com.anirban.model.OrderStatus;
import com.anirban.repository.OrderRepository;
import com.anirban.repository.ProductRepository;
import com.anirban.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================

    public AdminDashboardResponse getDashboardStats() {

        long totalProducts =
                productRepository.findByActiveTrue().size();

        long totalUsers =
                userRepository.count();

        long totalOrders =
                orderRepository.count();

        BigDecimal totalRevenue =
                orderRepository.findAll()
                        .stream()

                        // Do not count cancelled orders
                        .filter(order ->
                                order.getStatus()
                                        != OrderStatus.CANCELLED
                        )

                        .filter(order ->
                                order.getTotalAmount() != null
                        )

                        .map(order ->
                                order.getTotalAmount()
                        )

                        .reduce(
                                BigDecimal.ZERO,
                                BigDecimal::add
                        );

        return new AdminDashboardResponse(
                totalProducts,
                totalUsers,
                totalOrders,
                totalRevenue
        );
    }

    // ==========================================
    // DELETE USER
    // ==========================================

    public boolean deleteUser(Long userId) {

        if (!userRepository.existsById(userId)) {
            return false;
        }

        userRepository.deleteById(userId);

        return true;
    }
}