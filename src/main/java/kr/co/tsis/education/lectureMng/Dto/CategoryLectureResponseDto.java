package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CategoryLectureResponseDto {
    private int lectureId;
    private int lectureBestYn;
    private String lectureTitle;
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String academyName;
    private int onlineYn;
    private String academyLoc;

    @Builder
    public CategoryLectureResponseDto( int lectureId, int lectureBestYn, String lectureTitle
            , String depth1Field, String depth2Skill, String depth3Course,
                                       String academyName, int onlineYn, String academyLoc) {
        this.lectureId = lectureId;
        this.lectureBestYn = lectureBestYn;
        this.lectureTitle = lectureTitle;
        this.depth1Field = depth1Field;
        this.depth2Skill = depth2Skill;
        this.depth3Course = depth3Course;
        this.academyName = academyName;
        this.onlineYn = onlineYn;
        this.academyLoc = academyLoc;
    }
}
