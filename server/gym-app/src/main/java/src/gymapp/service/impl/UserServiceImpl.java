package src.gymapp.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import src.gymapp.config.JwtUtil;
import src.gymapp.model.LoginRequest;
import src.gymapp.model.User;
import src.gymapp.repository.UserRepository;
import src.gymapp.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

     @Autowired
     private UserRepository userRepository;

    @Transactional
    @Override
    public String login(LoginRequest request) {
        Optional <User> userOpt = userRepository.findByEmail(request.getEmail());
        if(userOpt.isEmpty()){
            return "User not found";
        }
        User user = userOpt.get();
        if (!user.getUsername().equals(request.getUsername()) ||
                !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

}
