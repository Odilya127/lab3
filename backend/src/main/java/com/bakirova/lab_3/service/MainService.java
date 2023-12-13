package com.bakirova.lab_3.service;

import com.bakirova.lab_3.dto.UserDTO;
import com.bakirova.lab_3.model.Authority;
import com.bakirova.lab_3.model.User;
import com.bakirova.lab_3.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class MainService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Integer doMove(List<Integer> availableNumbers) {
        Collections.shuffle(availableNumbers);
        return availableNumbers.get(0);
    }

    public User getByUsername(String username) {
        return userRepository.findAll().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }

    public void create(UserDTO dto) {
        Authority authority = new Authority();
        authority.setAuthority("USER");
        authority.setUsername(dto.getUsername());

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setName(dto.getName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setAuthority(authority);
        user.setEnabled(true);

        userRepository.save(user);
    }
}
