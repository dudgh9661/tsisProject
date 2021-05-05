package kr.co.tsis.education.admin;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface adminRepository {
    List<lectureDTO> getAdmin();
    List<lectureDTO> getUser(String s);
    int setAdmin(String empId);
    int delAdmin(String empId);
}
