package src.gymapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "progresslog")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProgressLog {
    @Id @GeneratedValue
    private Long id;
    private LocalDateTime date;
    private double weight;
    private double bodyFatPercentage;

    @ManyToOne
    private User user;

}
