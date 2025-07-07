package src.gymapp.service.impl;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import src.gymapp.model.Client;
import src.gymapp.model.LoginRequest;
import src.gymapp.model.User;
import src.gymapp.repository.ClientRepository;
import src.gymapp.service.ClientService;

import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    public ClientRepository clientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Transactional
    @Override
    public Client registerClient(Client client){
        Optional<User> isEmailExist = clientRepository.findByEmail(client.getEmail());

        if(isEmailExist.isPresent() ){
            throw  new RuntimeException("Email already exists");
        }
        if (client.getEmail()==null && client.getPassword()==null && client.getUsername()==null){
            throw new RuntimeException("Please fill all fields");
        }
        Client newClient = new Client();
        newClient.setEmail(client.getEmail());
        newClient.setUsername(client.getUsername());
        String hashedPassword = passwordEncoder.encode(client.getPassword());
        newClient.setPassword(hashedPassword);
        return clientRepository.save(newClient);
    }


}
