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
@DiscriminatorValue("CLIENT")
public class Client extends User {


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private BodyProfile bodyProfile;

    @OneToMany(mappedBy = "user")
    private List<ProgressLog> progressLog = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Quote> quotes = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

//    @OneToMany(mappedBy = "sender")
//    private List<Message> messagesSent = new ArrayList<>();

//    @OneToMany(mappedBy = "receiver")
//    private List<Message> messagesReceived = new ArrayList<>();
}
