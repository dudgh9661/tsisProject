package kr.co.tsis.education.repository;

import kr.co.tsis.education.lectureMng.Dto.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository {

    List<LectureResponseDto> categorySearch(String depth1Field, String depth2Skill, String depth3Course,
                                                    String lectureTitle);

    List<LectureResponseDto> academySearch(String academyId, String lectureTitle);

    List<LectureResponseDto> recommendSearch(String lectureTitle, int themeLectureId);

    List<LectureResponseDto> allSearch(String lectureTitle);

    int delete(int lectureId);

    int getCategoryId(String depth1Field, String depth2Skill, String depth3Course);

    boolean deleteRequiredTableColumn(int lectureId);

    void addRequiredTable(String empPosition, int empYears, int lectureId);

    void update(String lectureTitle, String lectureUrl, int onlineYn, int lectureBestYn, int categoryId, String academyId, int themeLectureId, String eduLevelId, int academySubjectId);

    ToModifyPageDataResponseDto getToModifyPageData(int lectureId);

    List<empDto> getEmpList(int lectureId);

    void add(String depth1Field, String depth2Skill, String depth3Course, String lectureTitle, String academyId, String lectureUrl, int themeLectureId, List<empDto> empDtoList, int onlineYN, String eduLevelId, int lectureBestYn);

    void insertNewLecture(String lectureTitle, String lectureUrl, int onlineYn, int lectureBestYn, int categoryId, String academyId, String eduLevelId, int themeLectureId, int academySubjectId);

    //COUNT(*) 값을 받아서, 중복 여부를 체크하기 위한 쿼리

    int findByLectureTitleAndAcademyId(String lectureTitle, String academyId);

    int getAllTotalPage(String lectureTitle);

    int getRecommendTotalPage(String lectureTitle, int themeLectureId);

    int getAcademyTotalPage(String academyId, String lectureTitle);

    int getCategoryTotalPage(String depth1Field, String depth2Skill, String depth3Course, String lectureTitle);

    int getAcademySubjectId(String academyId, String depth2Skill);

    int getLectureIdAfterInsert();
}
