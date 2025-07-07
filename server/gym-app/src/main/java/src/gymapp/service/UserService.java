package src.gymapp.service;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import src.gymapp.model.LoginRequest;

public interface UserService {
    public String login(LoginRequest request);

}
