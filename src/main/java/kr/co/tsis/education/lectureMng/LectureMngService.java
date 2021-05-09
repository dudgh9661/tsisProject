package kr.co.tsis.education.lectureMng;

import kr.co.tsis.education.lectureMng.Dto.*;
import kr.co.tsis.education.repository.LectureRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LectureMngService {

    private final LectureRepository lectureRepository;

    private final Logger LOGGER = LoggerFactory.getLogger(LectureMngService.class);


    public List<LectureResponseDto> categorySearch(CategoryLectureRequestDto categoryLectureRequestDto) {
        return lectureRepository.categorySearch(categoryLectureRequestDto.getDepth1Field(), categoryLectureRequestDto.getDepth2Skill(),
                categoryLectureRequestDto.getDepth3Course(), categoryLectureRequestDto.getLectureTitle());
    }

    public List<LectureResponseDto> academySearch(AcademyLectureRequestDto academyLectureRequestDto) {
        return lectureRepository.academySearch(academyLectureRequestDto.getAcademyId(), academyLectureRequestDto.getLectureTitle());
    }

    public List<LectureResponseDto> recommendSearch(RecommendLectureRequestDto recommendLectureRequestDto) {
        return lectureRepository.recommendSearch(recommendLectureRequestDto.getLectureTitle(),
                recommendLectureRequestDto.getThemeLectureId());
    }

    public List<LectureResponseDto> allSearch(AllLectureRequestDto allLectureRequestDto) {
        return lectureRepository.allSearch(allLectureRequestDto.getLectureTitle());
    }
    @Transactional
    public boolean delete(int lectureId) {
        //삭제 성공 : 1 실패 : 0
        if( lectureRepository.delete(lectureId) > 0 ) return true;
        else return false;
    }

    @Transactional
    public boolean update(int lectureId, ModifyLectureSaveButtonRequestDto modifyLectureSaveButtonRequestDto) {
        //1. 카테고리 대,중,소분류 먼저 확인해서 category_id 가져오기
        int categoryId = lectureRepository.getCategoryId(modifyLectureSaveButtonRequestDto.getDepth1Field(),
                modifyLectureSaveButtonRequestDto.getDepth2Skill(), modifyLectureSaveButtonRequestDto.getDepth3Course());
        //2. 기관 별 주제 아이디 찾아서 넣어주기
        int academySubjectId = lectureRepository.getAcademySubjectId(modifyLectureSaveButtonRequestDto.getAcademyId(),
                modifyLectureSaveButtonRequestDto.getDepth2Skill());
        //3. 필수 강좌 테이블 lecture_id를 이용해서 먼저 컬럼 삭제
        boolean isDeleted = lectureRepository.deleteRequiredTableColumn(lectureId);
        if (!isDeleted) System.out.println(" fail : 2. 필수 강좌 테이블 lecture_id를 이용해서 먼저 컬럼 삭제");
        System.out.println(lectureId + "가 삭제되었습니다.");

        //4. 필수 강좌 테이블 lecture_id와 함께 데이터 추가
        List<empDto> empDtoList = modifyLectureSaveButtonRequestDto.getEmpDtoList();
        for(int i = 0; i < empDtoList.size(); i++) {
            String empPosition = empDtoList.get(i).getEmpPosition();
            int empYears = empDtoList.get(i).getEmpYears();
            lectureRepository.addRequiredTable(empPosition, empYears, lectureId);
        }
        //5. 필수 강좌 테이블 lecture_id와 함께 데이터 추가
        lectureRepository.update(modifyLectureSaveButtonRequestDto.getLectureTitle(), modifyLectureSaveButtonRequestDto.getLectureUrl(),
                modifyLectureSaveButtonRequestDto.getOnlineYn(), modifyLectureSaveButtonRequestDto.getLectureBestYn(),
                categoryId, modifyLectureSaveButtonRequestDto.getAcademyId(), modifyLectureSaveButtonRequestDto.getThemeLectureId(),
                modifyLectureSaveButtonRequestDto.getEduLevelId(), academySubjectId, lectureId);
        System.out.println("강의가 수정되었습니다.");
        return true;
    }


    //ToModifyPageData 매칭
    public ToModifyPageDataResponseDto getToModifyPageData(int lectureId) {
        return lectureRepository.getToModifyPageData(lectureId);
    }
    //ToModifyPageEmp 매칭
    public List<empDto> getEmpList(int lectureId) {
        return lectureRepository.getEmpList(lectureId);
    }

    @Transactional
    public boolean add(AddLectureRequestDto addLectureRequestDto) {
        //중복되는 강의라면,즉 이미 해당 강의가 존재한다면
        if( lectureRepository.findByLectureTitleAndAcademyId(addLectureRequestDto.getLectureTitle(),
                addLectureRequestDto.getAcademyId()) > 0 ) {
            System.out.println("중복된 강의가 존재합니다.");
            return true;
        }
        else {
            System.out.println("테스트 시작!!!");
            //1. 카테고리 대,중,소분류 먼저 확인해서 category_id 가져오기
            int categoryId = lectureRepository.getCategoryId(addLectureRequestDto.getDepth1Field(),
                    addLectureRequestDto.getDepth2Skill(), addLectureRequestDto.getDepth3Course());
            System.out.println("categoryId : " + categoryId);

            //2. 기관 별 주제 아이디 찾아서 넣어주기
            int academySubjectId = lectureRepository.getAcademySubjectId(addLectureRequestDto.getAcademyId(),
                    addLectureRequestDto.getDepth2Skill());

            //3. 강좌 테이블에 새로운 강좌 정보 상위 쿼리에서 받은 값과 함께 추가
            lectureRepository.insertNewLecture(addLectureRequestDto.getLectureTitle(),
                    addLectureRequestDto.getLectureUrl(), addLectureRequestDto.getOnlineYn(),
                    addLectureRequestDto.getLectureBestYn(), categoryId, addLectureRequestDto.getAcademyId(),
                    addLectureRequestDto.getEduLevelId(), addLectureRequestDto.getThemeLectureId(), academySubjectId);
            int lectureId = lectureRepository.getLectureIdAfterInsert();
            System.out.println("getLectureIdAfterInsert : " + lectureId);

            //4. 필수 강좌 테이블 lecture_id와 함께 데이터 추가
            List<empDto> empDtoList = addLectureRequestDto.getEmpDtoList();
            for(int i = 0; i < empDtoList.size(); i++) {
                String empPosition = empDtoList.get(i).getEmpPosition();
                int empYears = empDtoList.get(i).getEmpYears();
                lectureRepository.addRequiredTable(empPosition, empYears, lectureId);
            }
            System.out.println("강의를 등록했습니다.");
            return false;
        }
    }

    public int getAllTotalPage(AllLectureRequestDto allLectureRequestDto) {
        return lectureRepository.getAllTotalPage(allLectureRequestDto.getLectureTitle());
    }

    public int getRecommendTotalPage(RecommendLectureRequestDto recommendLectureRequestDto) {
        return lectureRepository.getRecommendTotalPage(recommendLectureRequestDto.getLectureTitle(),
                recommendLectureRequestDto.getThemeLectureId());
    }

    public int getAcademyTotalPage(AcademyLectureRequestDto academyLectureRequestDto) {
        return lectureRepository.getAcademyTotalPage(academyLectureRequestDto.getAcademyId(),
                academyLectureRequestDto.getLectureTitle());
    }

    public int getCategoryTotalPage(CategoryLectureRequestDto categoryLectureRequestDto) {
        return lectureRepository.getCategoryTotalPage(categoryLectureRequestDto.getDepth1Field(),
                categoryLectureRequestDto.getDepth2Skill(), categoryLectureRequestDto.getDepth3Course(),
                categoryLectureRequestDto.getLectureTitle());
    }
}


