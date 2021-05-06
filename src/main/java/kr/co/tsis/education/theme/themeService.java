package kr.co.tsis.education.theme;

import kr.co.tsis.education.theme.DTOS.lectureDTO;
import kr.co.tsis.education.theme.DTOS.themeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class themeService {
    @Autowired
    private themeRepository dao;

    public List<themeDTO> getThemeList(){
        return dao.getThemeList();
    }

    public List<lectureDTO> getLectureList(int id, int curpage){
        return dao.getLectureList(id,curpage);
    }

    public int delTheme(int id){
        return dao.delTheme(id);
    }

    public String getTheme(int id){
        return dao.getTheme(id);
    }

    public int modifyTheme(themeDTO dto){
        return dao.modifyTheme(dto);
    }

    public int addTheme(String theme){
        return dao.addTheme(theme);
    }

    public int setTheme(int lectureid, int themeid){
        return dao.setTheme(lectureid,themeid);
    }
}
