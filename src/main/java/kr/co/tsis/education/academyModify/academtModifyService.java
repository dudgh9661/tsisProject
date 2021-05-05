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
        return dao.addAcademy(dto);
    }
}
