package src.gymapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import src.gymapp.model.WorkoutPlan;

import java.time.DayOfWeek;
import java.util.List;

@Entity
@Table(name = "workoutday")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WorkoutDay {
    @Id
    @GeneratedValue
    private Long id;

    private DayOfWeek day;

    @ElementCollection
    private List<String> exercises;

    @ManyToOne
    private WorkoutPlan plan;
}
