package src.gymapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CalendarEvent {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @ManyToOne
    private User user;
}
