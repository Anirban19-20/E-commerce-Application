package com.anirban.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anirban.dto.OrderItemDTO;
import com.anirban.dto.OrderResponse;
import com.anirban.model.CartItem;
import com.anirban.model.Order;
import com.anirban.model.OrderItem;
import com.anirban.model.OrderStatus;
import com.anirban.model.User;
import com.anirban.repository.OrderRepository;
import com.anirban.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    public Optional<OrderResponse> createOrder(String userId) {

        if (userId == null || userId.isEmpty()) {
            throw new RuntimeException("UserId is missing");
        }

        Optional<User> userOptional =
                userRepository.findById(Long.valueOf(userId));

        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();

        List<CartItem> cartItems =
                cartService.getCart(userId);

        if (cartItems == null || cartItems.isEmpty()) {
            return Optional.empty();
        }

        BigDecimal totalPrice = cartItems.stream()
                .map(item ->
                        item.getPrice().multiply(
                                BigDecimal.valueOf(
                                        item.getQuantity()
                                )
                        )
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.CONFIRMED);
        order.setTotalAmount(totalPrice);

        List<OrderItem> orderItems = cartItems.stream()
                .map(item -> new OrderItem(
                        null,
                        item.getProduct(),
                        item.getQuantity(),
                        item.getPrice(),
                        order
                ))
                .toList();

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        // Clear cart after successful order creation
        cartService.clearCart(userId);

        return Optional.of(
                mapToOrderResponse(savedOrder)
        );
    }

    public List<OrderResponse> getOrdersByUser(String userId) {

        return orderRepository
                .findByUserIdOrderByCreatedAtDesc(
                        Long.valueOf(userId)
                )
                .stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    private OrderResponse mapToOrderResponse(Order order) {

        return new OrderResponse(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus(),

                order.getItems()
                        .stream()
                        .map(orderItem -> new OrderItemDTO(
                                orderItem.getId(),

                                orderItem
                                        .getProduct()
                                        .getId(),

                                orderItem
                                        .getProduct()
                                        .getName(),

                                orderItem
                                        .getProduct()
                                        .getImageUrl(),

                                orderItem.getQuantity(),

                                orderItem.getPrice(),

                                orderItem.getPrice().multiply(
                                        BigDecimal.valueOf(
                                                orderItem.getQuantity()
                                        )
                                )
                        ))
                        .toList(),

                order.getCreatedAt()
        );
    }
}