// UserDto.java
package src.gymapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        USER,
        ADMIN,
        TRAINER
    }

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private BodyProfile bodyProfile;

    @OneToMany(mappedBy = "user")
    private List<ProgressLog> progressLog = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Quote> quotes = new ArrayList<>();

//    @OneToMany(mappedBy = "sender")
//    private List<Message> messagesSent = new ArrayList<>();

//    @OneToMany(mappedBy = "receiver")
//    private List<Message> messagesReceived = new ArrayList<>();
}
