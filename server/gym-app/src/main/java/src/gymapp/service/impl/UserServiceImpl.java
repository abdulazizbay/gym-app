package src.gymapp.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import src.gymapp.config.JwtUtil;
import src.gymapp.model.*;
import src.gymapp.repository.UserRepository;
import src.gymapp.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImpl(JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }


        return jwtUtil.generateToken(user.getUsername(), getRole(user));


    }

    private String getRole(User user) {
        if (user instanceof Admin) return "ADMIN";
        if (user instanceof Trainer) return "TRAINER";
        if (user instanceof Client) return "CLIENT";
        return "USER";
    }
}


