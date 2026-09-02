package com.anirban.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anirban.dto.ProductRequest;
import com.anirban.dto.ProductResponse;
import com.anirban.model.Product;
import com.anirban.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Create Product
    public ProductResponse createProduct(ProductRequest productRequest) {

        Product product = new Product();

        updateProductFromRequest(product, productRequest);

        product.setActive(true);

        Product savedProduct = productRepository.save(product);

        return mapToProductResponse(savedProduct);
    }

    // Update Product
    public Optional<ProductResponse> updateProduct(Long id, ProductRequest productRequest) {

        return productRepository.findById(id)
                .map(existingProduct -> {

                    updateProductFromRequest(existingProduct, productRequest);

                    Product updatedProduct =
                            productRepository.save(existingProduct);

                    return mapToProductResponse(updatedProduct);
                });
    }

    // Get All Products
    public List<ProductResponse> getAllProducts() {

        return productRepository.findByActiveTrue()
                .stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    // Get Product By ID
    public Optional<ProductResponse> getProductById(Long id) {

        return productRepository.findById(id)
                .map(this::mapToProductResponse);
    }

    // Search Products
    public List<ProductResponse> searchProducts(String keyword) {

        return productRepository.searchProducts(keyword)
                .stream()
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
    }

    // Soft Delete Product
    public boolean deleteProduct(Long id) {

        return productRepository.findById(id)
                .map(product -> {

                    product.setActive(false);

                    productRepository.save(product);

                    return true;
                })
                .orElse(false);
    }

    // Convert Entity -> Response DTO
    private ProductResponse mapToProductResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(String.valueOf(product.getId()));
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setCategory(product.getCategory());
        response.setPrice(product.getPrice());
        response.setStockQuantity(product.getStockQuantity());
        response.setImageUrl(product.getImageUrl());
        response.setActive(product.getActive());

        // Multiple Images
        response.setAdditionalImages(product.getAdditionalImages());

        return response;
    }

    // Convert Request DTO -> Entity
    private void updateProductFromRequest(
            Product product,
            ProductRequest request) {

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());

        // Multiple Images
        product.setAdditionalImages(request.getAdditionalImages());
    }
}