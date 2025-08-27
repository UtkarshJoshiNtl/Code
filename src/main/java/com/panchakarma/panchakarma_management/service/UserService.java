package com.panchakarma.panchakarma_management.service;
import com.panchakarma.panchakarma_management.Repository.UserRepository;
import com.panchakarma.panchakarma_management.Appointment;
import com.panchakarma.panchakarma_management.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        // For demo: Save user without password encoding
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
