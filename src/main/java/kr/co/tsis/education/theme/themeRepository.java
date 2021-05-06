package kr.co.tsis.education.theme;

import kr.co.tsis.education.theme.DTOS.lectureDTO;
import kr.co.tsis.education.theme.DTOS.themeDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface themeRepository {
    List<themeDTO> getThemeList();
    List<lectureDTO> getLectureList(int id, int page);
    int delTheme(int id);
    String getTheme(int id);
    int modifyTheme(themeDTO dto);
    int addTheme(String theme);
    int setTheme(int lectureid,int themeid);

}
