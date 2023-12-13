package com.bakirova.lab_3.controller;

import com.bakirova.lab_3.dto.UserDTO;
import com.bakirova.lab_3.model.User;
import com.bakirova.lab_3.service.MainService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/")
@RestController
@AllArgsConstructor
public class MainController {

    private final MainService mainService;

    @PostMapping("register")
    public void registerUser(@RequestBody UserDTO dto) {
        mainService.create(dto);
    }

    @PostMapping("move")
    public Integer userMove(@RequestBody List<Integer> availableNumbers) {
        return mainService.doMove(availableNumbers);
    }

    @PostMapping("post-login")
    public User postLogin() {
        UserDetails currentUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return mainService.getByUsername(currentUser.getUsername());
    }
}
