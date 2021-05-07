package kr.co.tsis.education.categoryPage;

import kr.co.tsis.education.categoryByLecture.CategoryByLectureService;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth1;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth2;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth3;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/CategoryPage")
public class CategoryPageController {

    @Autowired
    private CategoryPageService cpService;


    /*@GetMapping("/getCategoryDepth1")
    public ResponseEntity<List<LectureCategoryDepth1>> getCategoryDepth1() {
        List<LectureCategoryDepth1> list= cpService.getLectureCategoryDepth1();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }*/

    @GetMapping("/getCategoryDepth1")
    public String getCategoryDepth1(Model model) {
        List<LectureCategoryDepth1> list= cpService.getLectureCategoryDepth1();
        model.addAttribute("LectureList",list);
        return "user/CategoryEduPage";
    }

    @ResponseBody
    @GetMapping("/getCategoryDepth2")
    public ResponseEntity<String> getCategoryDepth2(String depth1Field) {
        List<LectureCategoryDepth2> list= cpService.getLectureCategoryDepth2(depth1Field);

        Map<String, List<String>> map = new HashMap<>();

        for (LectureCategoryDepth2 depth2 : list) {
            if(map.containsKey(depth2.getDepth2Skill())){
                map.get(depth2.getDepth2Skill()).add(depth2.getDepth3Course());
            } else {
                List<String> arrayList = new ArrayList<>();
                arrayList.add(depth2.getDepth3Course());
                map.put(depth2.getDepth2Skill(), arrayList);
            }
        }
        JSONObject json =  new JSONObject(map);
        System.out.println(json);

        return new ResponseEntity<>(json.toString(), HttpStatus.OK);
    }
}
