package com.anirban.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.anirban.dto.RazorpayOrderRequest;
import com.anirban.dto.RazorpayOrderResponse;
import com.anirban.service.RazorpayService;
import com.razorpay.Order;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = {
        "https://nexabuy1.netlify.app",
        "http://localhost:3000"
})
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @PostMapping("/create-order")
    public ResponseEntity<RazorpayOrderResponse> createOrder(
            @RequestBody RazorpayOrderRequest request)
            throws Exception {

        Order order = razorpayService.createOrder(
                request.getAmount()
        );

        Integer amount = ((Number) order.get("amount")).intValue();

        String orderId = order.get("id").toString();
        String currency = order.get("currency").toString();

        RazorpayOrderResponse response =
                new RazorpayOrderResponse(
                        orderId,
                        currency,
                        amount
                );

        return ResponseEntity.ok(response);
    }
}