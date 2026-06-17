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
    public ResponseEntity<RazorpayOrderResponse>
    createOrder(
            @RequestBody
            RazorpayOrderRequest request)
            throws Exception {

        Order order =
                razorpayService.createOrder(
                        request.getAmount()
                );

        RazorpayOrderResponse response =
                new RazorpayOrderResponse(
                        order.get("id"),
                        order.get("currency"),
                        order.get("amount")
                );

        return ResponseEntity.ok(response);
    }
}