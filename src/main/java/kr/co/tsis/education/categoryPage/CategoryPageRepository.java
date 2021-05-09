package kr.co.tsis.education.categoryPage;

import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth1;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth2;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth3;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryPageRepository {
    public List<LectureCategoryDepth1> getLectureCategoryDepth1();
    public List<LectureCategoryDepth2> getLectureCategoryDepth2(String depth1Field);
}

