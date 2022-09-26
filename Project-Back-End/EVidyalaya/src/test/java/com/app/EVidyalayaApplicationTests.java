package com.app;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.IUserRepository;

@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class EVidyalayaApplicationTests {

	@Autowired
	IUserRepository userRepo;

	@Test
	@Order(1)
	public void testCreate() {
		User u = new User();
		u.setName("Mortal");
		u.setAddress("Mumbai Bootcamp");
		u.setDob(LocalDate.parse("2002-02-02"));
		u.setEmail("naman@gmail.com");
		u.setPassword("Naman");
		u.setRole(Role.ROLE_STUDENT);
		u.setMobNo("9145587143");
		userRepo.save(u);
		assertNotNull(userRepo.findByEmail("naman@gmail.com"));
	}

	@Test
	@Order(2)
	public void testReadAll() {
		List<User> users = userRepo.findAll();
		assertThat(users).size().isGreaterThan(0);
	}

	@Test
	@Order(3)
	public void testUpdate() {
		User u = userRepo.findById(19L).get();
		u.setName("Naman Mathur");
		userRepo.save(u);
		assertNotEquals("Naman", userRepo.findById(19L).get().getName());
	}

	@Test
	@Order(4)
	public void testDelete() {
		User u = userRepo.findById(19L).get();
		userRepo.delete(u);
		assertThat(userRepo.existsById(19L)).isFalse();

	}
}
