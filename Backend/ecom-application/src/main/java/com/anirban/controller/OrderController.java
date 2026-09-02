package com.anirban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anirban.dto.OrderResponse;
import com.anirban.model.OrderStatus;
import com.anirban.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {
        "https://nexabuy1.netlify.app",
        "http://localhost:3000"
})
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestHeader("X-User-ID") String userId) {

        return orderService.createOrder(userId)
                .map(orderResponse ->
                        new ResponseEntity<>(orderResponse, HttpStatus.CREATED))
                .orElseGet(() ->
                        ResponseEntity.badRequest().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                orderService.getOrdersByUser(userId)
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId) {

        return orderService.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{orderId}/status/{status}")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long orderId,
            @PathVariable OrderStatus status) {

        return orderService.updateOrderStatus(orderId, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}