package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ModifyLectureSaveButtonRequestDto {
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String lectureTitle;
    private String academyId;
    private String lectureUrl;
    private int themeLectureId;
    private List<empDto> empDtoList;
//    private String empPosition;
//    private int empYears;
    private int onlineYn;
    private String eduLevelId;
    private int lectureBestYn;

    @Builder
    public ModifyLectureSaveButtonRequestDto(String depth1Field, String depth2Skill,
                                             String depth3Course, String lectureTitle
            ,String academyId,String lectureUrl,int themeLectureId, List<empDto> empDtoList,
                                             int onlineYn,String eduLevelId, int lectureBestYn) {
        this.depth1Field = depth1Field;
        this.depth2Skill = depth2Skill;
        this.depth3Course = depth3Course;
        this.lectureTitle = lectureTitle;
        this.academyId = academyId;
        this.lectureUrl = lectureUrl;
        this.themeLectureId = themeLectureId;
        this.empDtoList = empDtoList;
//        this.empPosition = empPosition;
//        this.empYears = empYears;
        this.onlineYn = onlineYn;
        this.eduLevelId = eduLevelId;
        this.lectureBestYn = lectureBestYn;
    }
}
