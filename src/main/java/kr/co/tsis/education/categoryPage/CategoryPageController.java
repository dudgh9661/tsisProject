package kr.co.tsis.education.categoryPage;

import kr.co.tsis.education.categoryByLecture.CategoryByLectureService;
import kr.co.tsis.education.categoryByLecture.dto.CategoryByLectureAll;
import kr.co.tsis.education.categoryByLecture.dto.CategoryByLecturePush;
import kr.co.tsis.education.categoryByLecture.dto.LecturePush;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
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
                smallCategory.put("categoryId", depth2.getCategoryId());

                map.get(depth2.getDepth2Skill()).add(smallCategory);
            } else {
                List<JSONObject> arrayList = new ArrayList<>();
                JSONObject smallCategory = new JSONObject();
                smallCategory.put("depth3Name", depth2.getDepth3Course());
                smallCategory.put("depth3Num", depth2.getCategoryNum());
                smallCategory.put("categoryId", depth2.getCategoryId());

                arrayList.add(smallCategory);
                map.put(depth2.getDepth2Skill(), arrayList);
            }
        }
        JSONObject json =  new JSONObject(map);
        System.out.println(json);
        return new ResponseEntity<>(json.toString(), HttpStatus.OK);
    }


    @GetMapping("/goToCategoryByLecture")
    public String goToCategoryByLecture(String depth1Name, String depth2Name, String depth3Name, int categoryId, Model model, HttpSession session) {
        ArrayList<LectureCategory> mainCategoryList = cblService.mainCategoryList();

        model.addAttribute("mainCategoryList",mainCategoryList);

        ArrayList<LectureCategory> middleCategoryList = cblService.middleCategoryList(depth1Name);

        model.addAttribute("middleCategoryList", middleCategoryList);

        LectureCategory category = new LectureCategory();
        category.setDepth1Field(depth1Name);
        category.setDepth2Skill(depth2Name);

        ArrayList<LectureCategory> subClassList = cblService.subClassList(category);
        model.addAttribute("subClassList", subClassList);


/***********************************/
        String[] levelList = {"1","1","1"};

        Employee loginUser = (Employee)session.getAttribute("loginUser");
        int pageNum = 1;
        String dataPushNum = Arrays.toString(levelList).replaceAll("[^0-9]","");
        // String을 int로
        int pushNum = Integer.parseInt(dataPushNum);
        // 2진법을 10진법으로
        int sqlPush = Integer.valueOf(dataPushNum, 2);
        String dataPush = Integer.toString(sqlPush);

        CategoryByLecturePush pushData = new CategoryByLecturePush();
        pushData.setDataPush(dataPush);
        pushData.setCategoryId(categoryId);
        pushData.setEmpId(loginUser.getEmpId());

        int totalListNum = 20; // 출력되는 리스트 갯수
        int firstNum = pageNum * totalListNum; // 가장 먼저 출력되는 리스트 번호
        pushData.setColumnName("lec.lecture_title");

        pushData.setFirstNum(firstNum);
        pushData.setTotalListNum(totalListNum);
        //강좌 갯수
        int lectureNum = cblService.selectLectureNum(pushData);

        ArrayList<CategoryByLectureAll> lectureList = cblService.selectLectureList(pushData);

        int totalPageNationNum = (int)(lectureNum / totalListNum);//전체 페이지 갯수

        LecturePush lecturePush = new LecturePush(lectureList, totalPageNationNum, lectureNum);

        model.addAttribute("lecturePush", lecturePush);

        return "user/SubjectEduPage";
    }
}
