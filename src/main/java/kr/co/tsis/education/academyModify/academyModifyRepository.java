package kr.co.tsis.education.academyModify;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import org.springframework.stereotype.Repository;

@Repository
public interface academyModifyRepository {
    academyDTO getAcademy(String id);
    int setAcademy(academyDTO dto);
    int addAcademy(academyDTO dto);
}
