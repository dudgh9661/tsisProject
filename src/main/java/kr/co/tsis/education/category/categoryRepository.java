package kr.co.tsis.education.category;

import kr.co.tsis.education.category.DTOS.categoryDTO;
import kr.co.tsis.education.category.DTOS.categoryForm;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface categoryRepository {
    List<String> getDepth1();
    List<String> getDepth2(String depth1);
    List<String> getDepth3(String depth1,String depth2);
    List<categoryDTO> getList(String d1,String d2, String d3);
    int delDepth1(String d1);
    int delDepth2(String d1,String d2);
    int delDepth3(String d1,String d2,String d3);
    String getTitle(int id);
    int setDepth(categoryForm form);
    int addDepth1(categoryForm form);
    int addDepth2(categoryForm form);
    int addDepth3(categoryForm form);
    int setDepth1(categoryForm form);
    int setDepth2(categoryForm form);
    int setDepth3(categoryForm form);
}
