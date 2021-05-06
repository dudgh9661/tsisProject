package kr.co.tsis.education.academy;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface academyRepository {
    int getCount();
    List<academyDTO> getList(int page);
    int delList(String id);
    List<academyDTO> getAllList();
}
