package kr.co.tsis.education.categoryPage;

import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth1;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth2;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryPageService {

    @Autowired
    private CategoryPageRepository cpRepository;


    public List<LectureCategoryDepth1> getLectureCategoryDepth1(){
        return cpRepository.getLectureCategoryDepth1();
    }

    public List<LectureCategoryDepth2> getLectureCategoryDepth2(String depth1Field){
        List<LectureCategoryDepth2> list = cpRepository.getLectureCategoryDepth2(depth1Field);

        return list;
    }
}

