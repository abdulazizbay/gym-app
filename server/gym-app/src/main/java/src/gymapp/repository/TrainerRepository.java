package src.gymapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.gymapp.model.Quote;
import src.gymapp.model.Trainer;

import java.util.Optional;

public interface TrainerRepository extends JpaRepository<Trainer,Long> {
}
