package kr.co.tsis.education.categoryPage;

import kr.co.tsis.education.categoryByLecture.CategoryByLectureService;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth1;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth2;
import kr.co.tsis.education.categoryPage.dto.LectureCategoryDepth3;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.LectureCategory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/CategoryPage")
public class CategoryPageController {

    @Autowired
    private CategoryPageService cpService;
    @Autowired
    private CategoryByLectureService cblService;

    @GetMapping("/getCategoryDepth1")
    public String getCategoryDepth1(Model model, HttpServletRequest request) {

        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        //System.out.println(loginUser.getEmpId());
        if(loginUser != null){
            List<LectureCategoryDepth1> list= cpService.getLectureCategoryDepth1();
            model.addAttribute("LectureList",list);
            return "user/CategoryEduPage";
        }
        else{
            return "redirect:/";
        }
    }

    @ResponseBody
    @GetMapping("/getCategoryDepth2")
    public ResponseEntity<String> getCategoryDepth2(String depth1Field) {
        List<LectureCategoryDepth2> list= cpService.getLectureCategoryDepth2(depth1Field);

        Map<String, List<JSONObject>> map = new HashMap<>();

        for (LectureCategoryDepth2 depth2 : list) {
            if(map.containsKey(depth2.getDepth2Skill())){

                JSONObject smallCategory = new JSONObject();
                smallCategory.put("depth3Name", depth2.getDepth3Course());
                smallCategory.put("depth3Num", depth2.getCategoryNum());
                map.get(depth2.getDepth2Skill()).add(smallCategory);
            } else {
                List<JSONObject> arrayList = new ArrayList<>();
                JSONObject smallCategory = new JSONObject();
                smallCategory.put("depth3Name", depth2.getDepth3Course());
                smallCategory.put("depth3Num", depth2.getCategoryNum());

                map.put(depth2.getDepth2Skill(), arrayList);
            }
        }
        JSONObject json =  new JSONObject(map);

        return new ResponseEntity<>(json.toString(), HttpStatus.OK);
    }


    @GetMapping("/goToCategoryByLecture")
    public String goToCategoryByLecture(String depth1Name, String depth2Name, String depth3Name, Model model) {
        System.out.println("thisiscategory");
        System.out.println(depth3Name);
        ArrayList<LectureCategory> mainCategoryList = cblService.mainCategoryList();

        model.addAttribute("mainCategoryList",mainCategoryList);
        model.addAttribute("mainCategoryList",mainCategoryList);
        return "";
    }
}
