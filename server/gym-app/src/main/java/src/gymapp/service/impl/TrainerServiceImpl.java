package src.gymapp.service.impl;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.gymapp.model.Trainer;
import src.gymapp.repository.TrainerRepository;
import src.gymapp.repository.ClientRepository;
import src.gymapp.service.TrainerService;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerServiceImpl implements TrainerService {
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private ClientRepository userRepository;

    @Transactional
    @Override
    public Trainer addTrainer(Trainer trainer) {
        if (trainer.getId() != null) {
            Optional<Trainer> isExist = trainerRepository.findById(trainer.getId());
            if (isExist.isPresent()) {
                throw new RuntimeException("Trainer with id " + trainer.getId() + " already exists");
            }
        }

        Trainer newTrainer = new Trainer();
        newTrainer.setBio(trainer.getBio());
        newTrainer.setHourlyWage(trainer.getHourlyWage());
        newTrainer.setHourlyRate(trainer.getHourlyRate());
        newTrainer.setUsername(trainer.getUsername());

        return trainerRepository.save(newTrainer);
    }
    @Transactional
    @Override
    public List<Trainer> getAllTrainers (){
        return trainerRepository.findAll();
    }
}