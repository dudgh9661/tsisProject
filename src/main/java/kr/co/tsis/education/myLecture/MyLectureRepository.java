package kr.co.tsis.education.myLecture;

import kr.co.tsis.education.myLecture.dto.MyLecture;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class MyLectureRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    public MyLectureRepository(){

    }

    //나의 강좌(필수강좌)
    public ArrayList<MyLecture> myPageRequiredLecturesList(Employee loginUser){
        return (ArrayList)sqlSession.selectList("MyLectureMapper.myPageRequiredLecturesList", loginUser);
    }

    //관심 강좌
    public ArrayList<MyLecture> myWishLecturesList(Employee loginUser){
        return (ArrayList)sqlSession.selectList("MyLectureMapper.myWishLecturesList", loginUser);
    }
}
