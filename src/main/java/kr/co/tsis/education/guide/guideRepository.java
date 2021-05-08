package kr.co.tsis.education.guide;

import kr.co.tsis.education.guide.DTOS.guideDTO;
import org.springframework.stereotype.Repository;

@Repository
public interface guideRepository {
    guideDTO getGuide();
    int setGuide(guideDTO request);
}
