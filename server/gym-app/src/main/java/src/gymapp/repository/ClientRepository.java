package src.gymapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.gymapp.model.User;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<User,Long> {
    public Optional<User> findByEmail(String email);
}
