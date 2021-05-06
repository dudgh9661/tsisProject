package kr.co.tsis.education.categoryByLecture;

import kr.co.tsis.education.categoryByLecture.dto.EduInfoLevel;
import kr.co.tsis.education.userCommon.dto.LectureCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CategoryByLectureService {

    @Autowired
    private CategoryByLectureRepository cblRepository;

    public CategoryByLectureService(){

    }

    //대분류 리스트
    public ArrayList<LectureCategory> mainCategoryList(){
        return cblRepository.mainCategoryList();
    }

    //중분류 리스트
    public ArrayList<LectureCategory> middleCategoryList(String depth1Field){
        return cblRepository.middleCategoryList(depth1Field);
    }

    //소분류 리스트
    public ArrayList<LectureCategory> subClassList(LectureCategory category){
        return cblRepository.subClassList(category);
    }

    //과정 수준 리스트
    public ArrayList<EduInfoLevel> courseLevelList(int categoryId){
        return cblRepository.courseLevelList(categoryId);
    }

    // 관심강좌 등록
    public int wishListPush(int lectureId){
        return cblRepository.wishListPush(lectureId);
    }

    // 관심강좌 취소
    public int wishListPop(int lectureId){
        return cblRepository.wishListPop(lectureId);
    }
}
