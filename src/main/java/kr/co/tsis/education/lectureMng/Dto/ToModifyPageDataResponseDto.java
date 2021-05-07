package kr.co.tsis.education.lectureMng.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ToModifyPageDataResponseDto {
    private String lectureTitle;
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String academyName;
    private String academyUrl;
    private String theme;
    private int onlineYn;
    private String eduLevelId;
    private int lectureBestYn;
}
