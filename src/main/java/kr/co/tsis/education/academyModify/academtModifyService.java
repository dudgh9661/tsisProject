package kr.co.tsis.education.academyModify;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class academtModifyService {
    @Autowired
    private academyModifyRepository dao;

    public academyDTO getAcademy(String id){
        return dao.getAcademy(id);
    }

    public int setAcademy(academyDTO dto){
        return dao.setAcademy(dto);
    }

    public int addAcademy(academyDTO dto){
        String id = dao.getLast();
        String temp = id.substring(2);
        int count = Integer.parseInt(temp);
        count++;
        temp = Integer.toString(count);
        while(temp.length()<3){
            temp = "0"+temp;
        }
        id = "EI"+temp;
        dto.setAcademyId(id);
        System.out.println(id);
        return dao.addAcademy(dto);
    }
}
