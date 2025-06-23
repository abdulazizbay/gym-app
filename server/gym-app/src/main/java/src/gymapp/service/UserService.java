package src.gymapp.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestBody;
import src.gymapp.model.LoginRequest;
import src.gymapp.model.UserDto;

public interface UserService {
    public UserDto registerUser(@RequestBody UserDto userDto);
    public String login(@RequestBody LoginRequest request, HttpSession session);
}
