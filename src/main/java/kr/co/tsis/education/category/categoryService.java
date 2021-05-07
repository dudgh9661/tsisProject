package kr.co.tsis.education.category;

import kr.co.tsis.education.category.DTOS.categoryDTO;
import kr.co.tsis.education.category.DTOS.categoryForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class categoryService {
    @Autowired
    private categoryRepository dao;

    public List<String> getDepth1(){
        return dao.getDepth1();
    }

    public List<String> getDepth2(String depth1){
        return dao.getDepth2(depth1);
    }
    public List<String> getDepth3(String depth1,String depth2){
        return dao.getDepth3(depth1,depth2);
    }
    public List<categoryDTO> getList(String d1,String d2,String d3){
        return dao.getList(d1,d2,d3);
    }
    public int delDepth1(String d1){
        return dao.delDepth1(d1);
    }
    public int delDepth2(String d1,String d2){
        return dao.delDepth2(d1,d2);
    }
    public int delDepth3(String d1,String d2,String d3){
        return dao.delDepth3(d1,d2,d3);
    }

    public String getTitle(categoryForm form){
        return dao.getTitle(form.getLectureId());

    }

    public int setDepth(categoryForm form){
        return dao.setDepth(form);
    }

    public int addDepth(categoryForm form){
        if(form.getDepth1Field() == null){
            return dao.addDepth1(form);
        }
        else if(form.getDepth2Skill() == null){
            return dao.addDepth2(form);
        }
        else{
            return dao.addDepth3(form);
        }
    }

    public int resetDepth(categoryForm form){
        if(form.getDepth3Course() != null){
            return dao.setDepth3(form);
        }
        else if (form.getDepth2Skill()!= null){
            return dao.setDepth2(form);
        }
        else{
            return dao.setDepth1(form);
        }
    }
}
