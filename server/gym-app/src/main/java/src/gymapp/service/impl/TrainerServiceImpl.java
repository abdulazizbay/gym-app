package src.gymapp.service.impl;


import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import src.gymapp.model.Trainer;
import src.gymapp.repository.TrainerRepository;
import src.gymapp.repository.ClientRepository;
import src.gymapp.service.TrainerService;

import java.util.List;
import java.util.Optional;
@Slf4j
@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public Trainer addTrainer(Trainer trainer) {
        if (trainer.getId() != null && trainerRepository.findById(trainer.getId()).isPresent()) {
            throw new RuntimeException("Trainer with id " + trainer.getId() + " already exists");
        }

        trainer.setPassword(passwordEncoder.encode(trainer.getPassword()));
        return trainerRepository.save(trainer);
    }

    @Transactional
    @Override
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }
}
