package kr.co.tsis.education.service;

import kr.co.tsis.education.domain.Test;
import kr.co.tsis.education.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{

    @Autowired
    private TestRepository testRepository;

    @Override
    public List<Test> getTestNo() {
        return testRepository.getTestNo();
    }
}
