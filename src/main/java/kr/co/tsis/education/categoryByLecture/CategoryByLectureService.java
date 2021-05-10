package kr.co.tsis.education.categoryByLecture;

import kr.co.tsis.education.categoryByLecture.dto.CategoryByLectureAll;
import kr.co.tsis.education.categoryByLecture.dto.CategoryByLecturePush;
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
    public int wishListPush(CategoryByLectureAll lectureAll){
        return cblRepository.wishListPush(lectureAll);
    }

    // 관심강좌 취소
    public int wishListPop(CategoryByLectureAll lectureAll){
        return cblRepository.wishListPop(lectureAll);
    }

    //강좌갯수 구하기
    public int selectLectureNum(CategoryByLecturePush pushDate){
        return cblRepository.selectLectureNum(pushDate);
    }

    //과정 수준 강좌 리스트
    public ArrayList<CategoryByLectureAll> selectLectureList(CategoryByLecturePush pushData){
        return cblRepository.selectLectureList(pushData);
    }
}
