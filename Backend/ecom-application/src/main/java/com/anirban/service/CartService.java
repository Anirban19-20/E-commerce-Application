package com.anirban.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anirban.dto.CartItemRequest;
import com.anirban.model.CartItem;
import com.anirban.model.Product;
import com.anirban.model.User;
import com.anirban.repository.CartItemRepository;
import com.anirban.repository.ProductRepository;
import com.anirban.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CartService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean addToCart(String userId, CartItemRequest request) {

        System.out.println("========== ADD TO CART ==========");
        System.out.println("User ID: " + userId);
        System.out.println("Product ID: " + request.getProductId());
        System.out.println("Quantity: " + request.getQuantity());

        // Check Product
        Optional<Product> productOpt =
                productRepository.findById(request.getProductId());

        System.out.println("Product Found: " + productOpt.isPresent());

        if (productOpt.isEmpty()) {
            System.out.println("Product Not Found");
            return false;
        }

        Product product = productOpt.get();

        // Check Stock
        if (product.getStockQuantity() < request.getQuantity()) {
            System.out.println("Insufficient Stock");
            return false;
        }

        // Check User
        Optional<User> userOpt =
                userRepository.findById(Long.valueOf(userId));

        System.out.println("User Found: " + userOpt.isPresent());

        if (userOpt.isEmpty()) {
            System.out.println("User Not Found");
            return false;
        }

        User user = userOpt.get();

        // Check Existing Cart Item
        CartItem existingCartItem =
                cartItemRepository.findByUserAndProduct(user, product);

        System.out.println(
                "Existing Cart Item Found: "
                        + (existingCartItem != null));

        if (existingCartItem != null) {

            int newQuantity =
                    existingCartItem.getQuantity()
                            + request.getQuantity();

            existingCartItem.setQuantity(newQuantity);

            existingCartItem.setPrice(
                    product.getPrice()
                            .multiply(BigDecimal.valueOf(newQuantity)));

            cartItemRepository.save(existingCartItem);

            System.out.println(
                    "UPDATED EXISTING CART ITEM");
        } else {

            CartItem cartItem = new CartItem();

            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());

            cartItem.setPrice(
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            request.getQuantity())));

            cartItemRepository.save(cartItem);

            System.out.println(
                    "NEW CART ITEM SAVED");
        }

        System.out.println("ADD TO CART SUCCESS");

        return true;
    }

    public boolean deleteItemFromCart(
            String userId,
            Long productId) {

        Optional<Product> productOpt =
                productRepository.findById(productId);

        Optional<User> userOpt =
                userRepository.findById(
                        Long.valueOf(userId));

        if (productOpt.isPresent()
                && userOpt.isPresent()) {

            cartItemRepository.deleteByUserAndProduct(
                    userOpt.get(),
                    productOpt.get());

            return true;
        }

        return false;
    }

    public List<CartItem> getCart(String userId) {

        return userRepository.findById(
                        Long.valueOf(userId))
                .map(cartItemRepository::findByUser)
                .orElseGet(List::of);
    }

    public void clearCart(String userId) {

        userRepository.findById(
                        Long.valueOf(userId))
                .ifPresent(
                        cartItemRepository::deleteByUser);
    }
}