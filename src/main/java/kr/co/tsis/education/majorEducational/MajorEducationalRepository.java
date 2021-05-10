package kr.co.tsis.education.majorEducational;

import kr.co.tsis.education.userCommon.dto.Academy;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class MajorEducationalRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    // 교육기관 리스트
    public ArrayList<Academy> academyListSelect(){
        return (ArrayList)sqlSession.selectList("MajorEducationalMapper.academyListSelect");
    }
}
