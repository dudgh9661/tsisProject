package kr.co.tsis.education.categoryPage;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryPageRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;
}
