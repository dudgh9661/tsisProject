package kr.co.tsis.education.lectureMng.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LectureResponseDto {
    private int lectureId;
    private int lectureBestYn;
    private String lectureTitle;
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String academyName;
    private int onlineYn;
    private String academyLoc;
}
