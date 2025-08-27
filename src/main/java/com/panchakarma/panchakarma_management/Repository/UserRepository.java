package com.panchakarma.panchakarma_management.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.panchakarma.panchakarma_management.User;

@Repository  // Optional but recommended for clarity
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom finder method to get a user by username
    Optional<User> findByUsername(String username);
}
