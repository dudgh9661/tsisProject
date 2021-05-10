package kr.co.tsis.education.majorEducational;

import kr.co.tsis.education.userCommon.dto.Academy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MajorEducationalService {

    @Autowired
    private MajorEducationalRepository meRepository;

    // 교육기관 리스트
    public ArrayList<Academy> academyListSelect(){
        return meRepository.academyListSelect();
    }
}
