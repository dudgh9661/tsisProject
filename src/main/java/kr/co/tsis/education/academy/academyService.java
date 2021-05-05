package kr.co.tsis.education.academy;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.academy.DTOS.academyPageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class academyService {
    @Autowired
    private academyRepository dao;

    public academyPageDTO getList(int page){
        int totalcount = dao.getCount();
        int totpage = totalcount%12 ==0 ? totalcount/12 : (totalcount/12)+1;
        List<academyDTO> list = dao.getList(page);
        academyPageDTO result = new academyPageDTO();
        result.setTotalCount(totalcount);
        result.setOrgani(list);
        result.setTotalpage(totpage);
        return result;

    }

    public int delList(List<String> ids){
        int suc = 0;
        for(String id : ids){
            suc += dao.delList(id);
        }
        return suc;
    }
}
