package src.gymapp.service;

import src.gymapp.model.Admin;

import java.util.List;

public interface AdminService {
    public Admin addAdmin(Admin admin);
    public List<Admin> getAllAdmins();
}
