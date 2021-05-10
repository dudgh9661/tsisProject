package kr.co.tsis.education.lectureMng;

import kr.co.tsis.education.lectureMng.Dto.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class LectureMngController {

    private final LectureMngService lectureMngService;
    private static final Logger LOGGER = LoggerFactory.getLogger(LectureMngController.class);

    //카테고리별 강좌 검색 ( Swagger success )
    @PostMapping("/lectureMng/category")
    @ResponseBody
    public AllLectureResponseDto categorySearch(@RequestBody CategoryLectureRequestDto categoryLectureRequestDto) {
        List<LectureResponseDto> lectureResponseDtoList = lectureMngService.categorySearch(categoryLectureRequestDto);
        int totalPage = lectureMngService.getCategoryTotalPage(categoryLectureRequestDto);
        return AllLectureResponseDto.builder()
                .lectureResponseDtoList(lectureResponseDtoList)
                .totalPage(totalPage)
                .build();
    }

    //교육기관별 강좌 검색 ( Swagger success )
    @PostMapping("/lectureMng/academy")
    @ResponseBody
    public AllLectureResponseDto academySearch(@RequestBody AcademyLectureRequestDto academyLectureRequestDto) {
        List<LectureResponseDto> lectureResponseDtoList = lectureMngService.academySearch(academyLectureRequestDto);
        int totalPage = lectureMngService.getAcademyTotalPage(academyLectureRequestDto);
        return AllLectureResponseDto.builder()
                .lectureResponseDtoList(lectureResponseDtoList)
                .totalPage(totalPage)
                .build();
    }

    //추천별 강좌 검색 ( Swagger success )
    @PostMapping("/lectureMng/recommend")
    @ResponseBody
    public AllLectureResponseDto recommendSearch(@RequestBody RecommendLectureRequestDto recommendLectureRequestDto) {
        List<LectureResponseDto> lectureResponseDtoList = lectureMngService.recommendSearch(recommendLectureRequestDto);
        int totalPage = lectureMngService.getRecommendTotalPage(recommendLectureRequestDto);

        return AllLectureResponseDto.builder()
                .lectureResponseDtoList(lectureResponseDtoList)
                .totalPage(totalPage)
                .build();
    }

    //전체 강좌 검색 ( Swagger success )
    //리턴값 : AllLectureResponseDto(필드값 : 전체강의목록List, totalPage)
    @PostMapping("/lectureMng")
    @ResponseBody
    public AllLectureResponseDto allSearch(@RequestBody AllLectureRequestDto allLectureRequestDto) {

        List<LectureResponseDto> lectureResponseDtoList = lectureMngService.allSearch(allLectureRequestDto);
        LOGGER.debug("lectureResDtoList : " + lectureResponseDtoList.toString());
        int totalPage = lectureMngService.getAllTotalPage(allLectureRequestDto);
        LOGGER.debug("totalPage : " + totalPage);

        return AllLectureResponseDto.builder()
                .lectureResponseDtoList(lectureResponseDtoList)
                .totalPage(totalPage)
                .build();
    }

    // 강좌 검색페이지로 이동
    @GetMapping("/lectureMng")
    public String lectureMngAllSearchPage() {
        return "manager/lectureMng";
    }


    //강좌 삭제
    @DeleteMapping("/lectureMng/{lectureId}")
    public boolean delete(@PathVariable int lectureId) {
        System.out.println("/lectureMng/{lectureId} 진입");
        boolean isDeleted = false;
        if( lectureMngService.delete(lectureId) ) {
            System.out.println("삭제되었습니다.");
            isDeleted = true;
        } else System.out.println("삭제를 실패하였습니다..");
        return isDeleted;
    }

    /* 영국수정 */
    //강좌 수정 페이지로 데이터 전송
    @GetMapping("/lectureMng/modify")
    public String sendToModifyPage(@RequestParam(value="lectureId") int lectureId, Model model) {
        //EMP제외한 정보들 + EMP List를 담은 Dto => return
        System.out.println("lectureId : " + lectureId);
        ToModifyPageDataResponseDto toModifyPageDataResponseDto = lectureMngService.getToModifyPageData(lectureId);
        System.out.println(toModifyPageDataResponseDto.toString());
        List<empDto> empDtoList = lectureMngService.getEmpList(lectureId);

        ToModifyPageResponseDto toModifyPageResponseDto
                = ToModifyPageResponseDto.builder()
                .toModifyPageDataResponseDto(toModifyPageDataResponseDto)
                .empDtoList(empDtoList)
                .build();
        model.addAttribute("modifiedData", toModifyPageResponseDto);

        //onlineYn에 따른 return
        if( toModifyPageDataResponseDto.getOnlineYn() == 1 ) {
            model.addAttribute("online", true);
        }

        //eduLevelId에 따른 return
        if( toModifyPageDataResponseDto.getEduLevelId().equals("ET001")) {
            //전문강의
            model.addAttribute("eduLevelPro", true);
        } else if ( toModifyPageDataResponseDto.getEduLevelId().equals("ET002")) {
            //선택강의
            model.addAttribute("eduLevelSelect", true);
        } else {
            //기본강의
            model.addAttribute("eduLevelBasic", true);
        }

        //lectureBestYn에 따른 return
        if( toModifyPageDataResponseDto.getLectureBestYn() == 1 ) {
            model.addAttribute("best",true);
        }
        return "manager/lecture_mod";
    }

    //강좌 수정 저장 버튼 클릭
    @PutMapping("/lectureMng/modify/confirm/{lectureId}")
    public String update(@PathVariable(value="lectureId") int lectureId, @RequestBody ModifyLectureSaveButtonRequestDto modifyLectureSaveButtonRequestDto, Model model) {

        //강좌 중복 여부 확인( academyId, lectureTitle )
        boolean isOverlapped = lectureMngService.update(lectureId, modifyLectureSaveButtonRequestDto);
        return "/manager/lecturMng"; //저장하면, index 페이지로 가는게 맞지 않을까???
    }

    //강좌 추가 버튼 클릭 시 페이지 이동
    @GetMapping("/lectureMng/add")
    public String add() {
        return "/manager/lecture_mod";
    }

    //강좌 추가
    @PostMapping("/lectureMng/add")
    @ResponseBody
    public AddSuccessDto add(@RequestBody AddLectureRequestDto addLectureRequestDto, Model model) {

        //강좌 중복 여부 확인( academyId, lectureTitle )
        boolean isOverlapped = lectureMngService.add(addLectureRequestDto);

        if( isOverlapped ) { //강좌가 이미 존재하면, return false
            return new AddSuccessDto(false);
        }
        else {
            return new AddSuccessDto(true);
        }
    }
}
