package src.gymapp.service;
import src.gymapp.model.Trainer;

import java.util.List;

public interface TrainerService {
    public Trainer addTrainer( Trainer trainer);
    public List<Trainer> getAllTrainers( );

}
