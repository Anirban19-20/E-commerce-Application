package com.anirban.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity(name = "addresses")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String street;
	private String city;
	private String state;
	private String country;
	private String zipcode;
	public Address() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Address(Long id, String street, String city, String state, String country, String zipcode) {
		super();
		this.id = id;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipcode = zipcode;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	@Override
	public String toString() {
		return "Address [Id=" + id + ", street=" + street + ", city=" + city + ", state=" + state + ", country="
				+ country + ", zipcode=" + zipcode + "]";
	}
	
	
}
