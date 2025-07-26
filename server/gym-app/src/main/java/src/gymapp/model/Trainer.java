package src.gymapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DiscriminatorValue("TRAINER")
public class Trainer extends User {

    private String bio;
    private double hourlyRate;
    private double hourlyWage;
    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<Client> clients = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @Override
    public String getRole() {
        return "TRAINER";
    }
}
