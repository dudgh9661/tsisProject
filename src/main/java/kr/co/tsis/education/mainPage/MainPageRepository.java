package kr.co.tsis.education.mainPage;

import kr.co.tsis.education.mainPage.dto.MainPageLecture;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.Guide;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class MainPageRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    public MainPageRepository(){

    }

    //공지사항
    public Guide selectGuide(){
        return sqlSession.selectOne("MainPageMapper.selectGuide");
    }

    // 필수강좌
    public ArrayList<MainPageLecture> myRequiredLectureList(Employee loginUser){
        return (ArrayList)sqlSession.selectList("MainPageMapper.myRequiredLectureList", loginUser);
    }

}
