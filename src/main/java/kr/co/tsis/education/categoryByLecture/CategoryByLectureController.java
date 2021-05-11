package kr.co.tsis.education.categoryByLecture;

import kr.co.tsis.education.categoryByLecture.dto.CategoryByLectureAll;
import kr.co.tsis.education.categoryByLecture.dto.CategoryByLecturePush;
import kr.co.tsis.education.categoryByLecture.dto.EduInfoLevel;
import kr.co.tsis.education.categoryByLecture.dto.LecturePush;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.LectureCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@Controller
@RequestMapping("/categoryByLecture")
public class CategoryByLectureController {

    @Autowired
    private CategoryByLectureService cblService;

    public CategoryByLectureController(){

    }

    // 카테고리 선택 첫 페이지
    @GetMapping("/mainCategoryKinds")
    public String CategoryLectureView(Model model, HttpServletRequest request){
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        if(loginUser != null){
            ArrayList<LectureCategory> mainCategoryList = cblService.mainCategoryList();
            model.addAttribute("mainCategoryList",mainCategoryList);

            return "user/SubjectEduPage";
        }
        else{
            return "redirect:/";
        }

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
        //test
        //int categoryId = 1;
        int categoryId = Integer.parseInt(request.getParameter("categoryId"));
        ArrayList<EduInfoLevel> courseLevelList = cblService.courseLevelList(categoryId);
        return courseLevelList;
    }

    //과정 수준 클릭
    //질문하기
    @ResponseBody
    @GetMapping("/DuplicateCourseSelection")
    public LecturePush duplicateCourseList(HttpServletRequest request){
        int categoryId = Integer.parseInt(request.getParameter("categoryId"));
        int pageNum = Integer.parseInt(request.getParameter("pageNum")) - 1;
        String[] levelList = request.getParameterValues("levelList"); // 프론트에서 boolean으로 넘어오는데 확인해보기
        String columnName = request.getParameter("columnName");

        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기

        // 배열을 String으로
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
        pushData.setColumnName(columnName);
        pushData.setFirstNum(firstNum);
        pushData.setTotalListNum(totalListNum);
        //강좌 갯수
        int lectureNum = cblService.selectLectureNum(pushData);

        ArrayList<CategoryByLectureAll> lectureList = cblService.selectLectureList(pushData);

        int totalPageNationNum = (int)(lectureNum / totalListNum);//전체 페이지 갯수
        LecturePush lecturePush = new LecturePush(lectureList, totalPageNationNum, lectureNum);

        return lecturePush;

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
