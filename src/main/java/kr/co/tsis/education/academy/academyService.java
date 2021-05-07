package kr.co.tsis.education.academy;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.academy.DTOS.academyPageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class academyService {
    final static int limit = 12;
    @Autowired
    private academyRepository dao;

    public academyPageDTO getList(int page){
        int totalcount = dao.getCount();
        academyPageDTO result = new academyPageDTO();
        List<academyDTO> list;
        if(page == 0){
            list = dao.getAllList();
        }
        else {
            page = (page-1)*limit;
            list = dao.getList(page);
            int totpage = totalcount%12 ==0 ? totalcount/12 : (totalcount/12)+1;
            result.setTotalpage(totpage);
        }
        result.setTotalCount(totalcount);
        result.setOrgani(list);
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
