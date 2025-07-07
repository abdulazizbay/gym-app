package src.gymapp.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestBody;
import src.gymapp.model.Client;
import src.gymapp.model.LoginRequest;
import src.gymapp.model.User;

public interface ClientService {
    public Client registerClient( Client client);
}
