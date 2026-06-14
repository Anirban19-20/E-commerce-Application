package com.anirban.service;


import java.util.List;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anirban.dto.AddressDTO;
import com.anirban.dto.UserRequest;
import com.anirban.dto.UserResponse;
import com.anirban.model.Address;
import com.anirban.model.User;
import com.anirban.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
//	private List<User> userList = new ArrayList<>();
	//private Long nextId = 1L;
	
	public List<UserResponse> fetchAllUsers(){
		return userRepository.findAll().stream()
				.map(this::mapToUserResponse)
				.collect(Collectors.toList());
	}
	
	
	public void addUser(UserRequest userRequest){
//		user.setId(nextId++);
		User user = new User();
		updateUserFromRequest(user,userRequest);
		userRepository.save(user);
		
	}
	
	public Optional<UserResponse> fetchUser(Long id){
		return userRepository.findById(id)
				.map(this::mapToUserResponse);
	}
	
	public boolean updateUser(Long id, UserRequest updatedUserRequest) {
		return userRepository.findById(id)
				.map(existingUser -> {
					updateUserFromRequest(existingUser, updatedUserRequest);
					userRepository.save(existingUser);
					return true;
				}).orElse(false);
	}
	
	private void updateUserFromRequest(User user, UserRequest userRequest) {
		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setEmail(userRequest.getEmail());
		user.setPhone(userRequest.getPhone());
		user.setPassword(userRequest.getPassword());
		
		if(userRequest.getAddress() != null) {
			Address address = new Address();
			address.setStreet(userRequest.getAddress().getStreet());
			address.setCity(userRequest.getAddress().getCity());
			address.setCountry(userRequest.getAddress().getCountry());
			address.setState(userRequest.getAddress().getState());
			address.setZipcode(userRequest.getAddress().getZipcode());
			user.setAddress(address);
		}
	}
	
	
	
	private UserResponse mapToUserResponse(User user) {
		UserResponse response = new UserResponse();
		response.setId(String.valueOf(user.getId()));
		response.setFirstName(user.getFirstName());
		response.setLastName(user.getLastName());
		response.setEmail(user.getEmail());
		response.setPhone(user.getPhone());
		response.setPassword(user.getPassword());
		
		response.setRole(user.getRole());
		
		if(user.getAddress() != null) {
			AddressDTO addressDTO = new AddressDTO();
			addressDTO.setStreet(user.getAddress().getStreet());
			addressDTO.setCity(user.getAddress().getCity());
			addressDTO.setState(user.getAddress().getState());
			addressDTO.setCountry(user.getAddress().getCountry());
			addressDTO.setZipcode(user.getAddress().getZipcode());
			response.setAddress(addressDTO);
		}
		return response;
	}
}
