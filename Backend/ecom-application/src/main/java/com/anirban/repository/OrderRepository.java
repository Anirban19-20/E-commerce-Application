package com.anirban.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anirban.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

	List<Order> findAllByOrderByCreatedAtDesc();
}
