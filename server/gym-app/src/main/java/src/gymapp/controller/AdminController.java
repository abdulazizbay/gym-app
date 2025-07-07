package src.gymapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import src.gymapp.model.Admin;
import src.gymapp.model.Trainer;
import src.gymapp.service.AdminService;
import src.gymapp.service.TrainerService;

import java.util.List;


@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    public AdminService adminService;

    @PostMapping("/add")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin){
        try {
            Admin savedAdmin  =  adminService.addAdmin(admin);
            return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while saving admin", e);
        }
    }

    @GetMapping("/getAllAdmins")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        try {
            List<Admin> allAdmins = adminService.getAllAdmins();
            return new ResponseEntity<>(allAdmins, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while getting all admins", e);
        }
    }

}
