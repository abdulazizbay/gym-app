package src.gymapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "workoutplan")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WorkoutPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String goal;
    @OneToMany(mappedBy = "plan")
    private List<WorkoutDay> days;

}
