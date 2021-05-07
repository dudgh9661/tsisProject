package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class AddLectureRequestDto {
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String lectureTitle;
    private String academyId;
    private String lectureUrl;
    private int themeLectureId;
    private List<empDto> empDtoList;
    private int onlineYN;
    private String eduLevelId;
    private int lectureBestYn;

    @Builder
    public AddLectureRequestDto(String depth1Field, String depth2Skill, String depth3Course,
                                String lectureTitle, String academyId, String lectureUrl, int themeLectureId,
                                List<empDto> empDtoList, int onlineYN, String eduLevelId,
                                int lectureBestYn) {
        this.depth1Field = depth1Field;
        this.depth2Skill = depth2Skill;
        this.depth3Course = depth3Course;
        this.lectureTitle = lectureTitle;
        this.academyId = academyId;
        this.lectureUrl = lectureUrl;
        this.themeLectureId = themeLectureId;
        this.empDtoList = empDtoList;
        this.onlineYN = onlineYN;
        this.eduLevelId = eduLevelId;
        this.lectureBestYn = lectureBestYn;

    }
}
