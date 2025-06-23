package src.gymapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.gymapp.model.UserDto;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDto,Long> {
    public Optional<UserDto> findByEmail(String email);
}
