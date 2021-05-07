package kr.co.tsis.education.required;

import kr.co.tsis.education.required.DTOS.requiredForm;
import kr.co.tsis.education.required.DTOS.requiredLectureDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class requiredService {
    @Autowired
    private requiredRepository dao;

    public List<requiredLectureDTO> getList(requiredForm form){
        return dao.getList(form);
    }

    public List<String> getDepth1(){
        return dao.getDepth1();
    }

    public List<String> getDepth2(String depth1){
        return dao.getDepth2(depth1);
    }
    public List<String> getDepth3(String depth1,String depth2){
        return dao.getDepth3(depth1,depth2);
    }

    public List<requiredLectureDTO> getDpList(String d1,String d2,String d3){

        if(d1==null || d2 == null || d3 == null){
            List<requiredLectureDTO> result = new ArrayList<requiredLectureDTO>();
            return result;
        }
        return dao.getDpList(d1,d2,d3);
    }

    public List<requiredLectureDTO> getTitleList(String title){
        return dao.getTitleList(title);
    }

    public int addList(requiredForm form){
        return dao.addList(form);
    }

    public int delList(int id){
        return dao.delList(id);
    }
}
