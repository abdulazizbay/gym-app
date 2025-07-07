package src.gymapp.service.impl;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.gymapp.model.Admin;
import src.gymapp.repository.AdminRepository;
import src.gymapp.service.AdminService;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Transactional
    @Override
    public Admin addAdmin(Admin admin) {
        if (admin.getSuper_admin() && adminRepository.numberOfSuperAdmin() > 0) {
            throw new RuntimeException("Super Admin cannot be more than 1");
        }
        log.info("admin: {}", admin.getSuper_admin());

        boolean usernameExists = adminRepository.findByUsername(admin.getUsername()).isPresent();
        if (usernameExists) {
            throw new RuntimeException("This username already exists");
        }

        return adminRepository.save(admin);
    }

    @Transactional
    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
     }

}
