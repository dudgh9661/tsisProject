package kr.co.tsis.education.required;

import kr.co.tsis.education.required.DTOS.requiredForm;
import kr.co.tsis.education.required.DTOS.requiredLectureDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface requiredRepository {

    List<requiredLectureDTO> getList(requiredForm form);
    List<String> getDepth1();
    List<String> getDepth2(String depth1);
    List<String> getDepth3(String depth1,String depth2);
    List<requiredLectureDTO> getDpList(String depth1, String depth2, String depth3);
    List<requiredLectureDTO> getTitleList(String title);
    int addList(requiredForm form);
    int delList(int id);
}
