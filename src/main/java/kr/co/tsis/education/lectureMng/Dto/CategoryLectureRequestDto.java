package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CategoryLectureRequestDto {
    private String depth1Field = null;
    private String depth2Skill = null;
    private String depth3Course = null;
    private String lectureTitle = null;

    @Builder
    public CategoryLectureRequestDto(String depth1Field, String depth2Skill, String depth3Course, String lectureTitle) {
        this.depth1Field = depth1Field;
        this.depth2Skill = depth2Skill;
        this.depth3Course = depth3Course;
        this.lectureTitle = lectureTitle;
    }
}
