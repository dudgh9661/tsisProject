package kr.co.tsis.education.guide;

import kr.co.tsis.education.guide.DTOS.guideDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class guideService {
    @Autowired
    private guideRepository dao;

    public guideDTO getGuide(){
        return dao.getGuide();
    }

    public int setGuide(guideDTO request){
        return dao.setGuide(request);
    }
}
