package kr.co.tsis.education.theme;

import kr.co.tsis.education.theme.DTOS.lectureDTO;
import kr.co.tsis.education.theme.DTOS.lecturePageDTO;
import kr.co.tsis.education.theme.DTOS.themeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class themeService {
    @Autowired
    private themeRepository dao;
    final static int limit = 20;
    public List<themeDTO> getThemeList(){
        return dao.getThemeList();
    }

    public lecturePageDTO getLectureList(int id, int curpage){
        lecturePageDTO result = new lecturePageDTO();
        int start = (curpage-1)*limit;
        result.setLectures(dao.getLectureList(id,start));
        int count = dao.getLectureCount(id);
        int totalpage = count%20==0 ? count/20 : (count/20)+1;
        result.setTotalCount(count);
        result.setTotalPage(totalpage);
        return result;

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
