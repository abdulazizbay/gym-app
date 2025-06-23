package src.gymapp.service.impl;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.gymapp.model.LoginRequest;
import src.gymapp.model.UserDto;
import src.gymapp.repository.UserRepository;
import src.gymapp.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    public UserRepository userRepository;

    @Transactional
    @Override
    public UserDto registerUser(UserDto user){
        Optional<UserDto> isEmailExist = userRepository.findByEmail(user.getEmail());
        if(isEmailExist.isPresent() ){
            throw  new RuntimeException("Email already exists");
        }
        if (user.getEmail()==null && user.getPassword()==null && user.getRole()==null){
            throw new RuntimeException("Please enter all fields");
        }
        UserDto newUser = new UserDto();
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setRole(user.getRole());
        return userRepository.save(newUser);
    }
    @Transactional
    @Override
    public String login (LoginRequest request, HttpSession session){
        Optional<UserDto> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(request.getPassword())) {
            throw new RuntimeException( "Invalid email or password");
        }
        session.setAttribute("userId" , userOpt.get().getId());
        return "logged in";
    }
}
