package src.gymapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bodyprofile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BodyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int Id;

    private double weight;
    private double height;
    private double bodyFatPercentage;
    @Enumerated(EnumType.STRING)
    private BodyType bodyType;
    public enum BodyType {
        ECTOMORPH,
        ENDOMORPH,
        MESOMORPH,
    }
    private double recommendedCalories;
    private FitnessGoal fitnessGoal;
    public enum FitnessGoal {
        GAIN,
        LOOSE,
        MAINTAIN,
    }
    @Lob
    private byte[] photo;
    @OneToOne
    private User user;

}
