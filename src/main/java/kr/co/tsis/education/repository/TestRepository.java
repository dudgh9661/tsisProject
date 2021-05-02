package kr.co.tsis.education.repository;

import kr.co.tsis.education.domain.Test;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository {
    List<Test> getTestNo();
}
