package kr.co.tsis.education.categoryByLecture;

import kr.co.tsis.education.categoryByLecture.dto.CategoryByLectureAll;
import kr.co.tsis.education.categoryByLecture.dto.CategoryByLecturePush;
import kr.co.tsis.education.categoryByLecture.dto.EduInfoLevel;
import kr.co.tsis.education.userCommon.dto.LectureCategory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class CategoryByLectureRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    public CategoryByLectureRepository(){

    }

    //대분류 리스트
    public ArrayList<LectureCategory> mainCategoryList(){
        return (ArrayList)sqlSession.selectList("CategoryByLectureMapper.mainCategoryList");
    }

    //중분류 리스트
    public ArrayList<LectureCategory> middleCategoryList(String depth1Field){
        return (ArrayList)sqlSession.selectList("CategoryByLectureMapper.middleCategoryList", depth1Field);
    }

    //소분류 리스트
    public ArrayList<LectureCategory> subClassList(LectureCategory category){
        return (ArrayList)sqlSession.selectList("CategoryByLectureMapper.subClassList", category);
    }

    //과정 수준 리스트
    public ArrayList<EduInfoLevel> courseLevelList(int categoryId){
        return (ArrayList)sqlSession.selectList("CategoryByLectureMapper.courseLevelList", categoryId);
    }

    // 관심강좌 등록
    public int wishListPush(CategoryByLectureAll lectureAll){
        return sqlSession.insert("CategoryByLectureMapper.categoryWishListPush", lectureAll);
    }

    // 관심강좌 취소
    public int wishListPop(CategoryByLectureAll lectureAll){
        return sqlSession.delete("CategoryByLectureMapper.categoryWishListPop",lectureAll);
    }

    //강좌갯수 구하기
    public int selectLectureNum(CategoryByLecturePush pushDate){
        return sqlSession.selectOne("CategoryByLectureMapper.selectLectureNum",pushDate);
    }

    //과정 수준 강좌 리스트
    public ArrayList<CategoryByLectureAll> selectLectureList(CategoryByLecturePush pushData){
        return (ArrayList)sqlSession.selectList("CategoryByLectureMapper.selectLectureList", pushData);
    }
}
