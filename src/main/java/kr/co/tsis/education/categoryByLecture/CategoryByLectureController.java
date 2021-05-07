package kr.co.tsis.education.categoryByLecture;

import kr.co.tsis.education.categoryByLecture.dto.CategoryByLectureAll;
import kr.co.tsis.education.categoryByLecture.dto.EduInfoLevel;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.LectureCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Array;
import java.util.ArrayList;

@Controller
@RequestMapping("/categoryByLecture")
public class CategoryByLectureController {

    @Autowired
    private CategoryByLectureService cblService;

    public CategoryByLectureController(){

    }

    // 카테고리 선택 첫 페이지
    @GetMapping("/mainCategoryKinds")
    public String CategoryLectureView(Model model){
        ArrayList<LectureCategory> mainCategoryList = cblService.mainCategoryList();
        model.addAttribute("mainCategoryList",mainCategoryList);
        return "";
    }

    //중분류 리스트
    @ResponseBody
    @GetMapping("/middleCategoryKinds")
    public ArrayList<LectureCategory> middleCategoryKinds(HttpServletRequest request){
        String depth1Field = request.getParameter("depth1Field");
        ArrayList<LectureCategory> middleCategoryList = cblService.middleCategoryList(depth1Field);
        return middleCategoryList;
    }

    //소분류 리스트
    @ResponseBody
    @GetMapping("/subclassKinds")
    public ArrayList<LectureCategory> subclassKinds(HttpServletRequest request){
        String depth1Field = request.getParameter("depth1Field");
        String depth2Skill = request.getParameter("depth2Skill");
        LectureCategory category = new LectureCategory();
        category.setDepth1Field(depth1Field);
        category.setDepth2Skill(depth2Skill);
        ArrayList<LectureCategory> subClassList = cblService.subClassList(category);
        return subClassList;
    }

    //과정 수준 리스트
    @ResponseBody
    @GetMapping("/courseLevelKinds")
    public ArrayList<EduInfoLevel> courseLevelKinds(HttpServletRequest request){
        int categoryId = Integer.parseInt(request.getParameter("categoryId"));
        ArrayList<EduInfoLevel> courseLevelList = cblService.courseLevelList(categoryId);
        return courseLevelList;
    }

    //과정 수준 클릭
    //질문하기
    @ResponseBody
    @GetMapping("/DuplicateCourseSelection")
    public ArrayList<CategoryByLectureAll> duplicateCourseList(HttpServletRequest request){
        int categoryId = Integer.parseInt(request.getParameter("categoryId"));
        int pageNum = Integer.parseInt(request.getParameter("pageNum"));
        String[] levelList = request.getParameterValues("levelList"); // 프론트에서 boolean으로 넘어오는데 확인해보기
        String columnName = request.getParameter("columnName");
        //강좌 갯수
        int lectureNum = 0;
        String eduLevelId = "";
        for (int i = 0; i < levelList.length; i++){
            String levelId = levelList[i];
            if(levelId.equals("True")){
                if(i == 0){
                    eduLevelId = "ET001";
                }
                else if(i == 1){
                    eduLevelId = "ET002";
                }
                else{
                    eduLevelId = "ET003";
                }
                //lectureNum += cblService.selectLectureNum(); // 강좌갯수 구하기
            }

        }


    }

    //관심강좌 선택
    @ResponseBody
    @GetMapping("/wishListSelection")
    public int wishListSelection(HttpServletRequest request, HttpSession session){ // true, false는 어떤 변수명으로 넘겨줄건지
        int lectureId = Integer.parseInt(request.getParameter("lectureId"));
        String wishYn = request.getParameter("wishYn");
        // 사원정보
        session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        CategoryByLectureAll lectureAll = new CategoryByLectureAll();
        lectureAll.setLectureId(lectureId);
        lectureAll.setEmpId(loginUser.getEmpId());
        int wishPush = 0;
        if(wishYn.equals("true")){ // true일 경우 insert문
            wishPush = cblService.wishListPush(lectureAll);
        }
        else{// false일 경우 delete문
            wishPush = cblService.wishListPop(lectureAll);
        }
        return wishPush;
    }

}
