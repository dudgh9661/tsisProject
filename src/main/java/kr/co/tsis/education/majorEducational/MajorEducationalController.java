package kr.co.tsis.education.majorEducational;

import kr.co.tsis.education.userCommon.dto.Academy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;

@Controller
@RequestMapping("/majorEducational")
public class MajorEducationalController {

    @Autowired
    private MajorEducationalService meService;

    public MajorEducationalController(){

    }

    // 교육기관 리스트
    @GetMapping("/academyInfo")
    public String academyListView(Model model){
        ArrayList<Academy> academyList = meService.academyListSelect();
        model.addAttribute("academyList",academyList);
        return "";
    }
}
