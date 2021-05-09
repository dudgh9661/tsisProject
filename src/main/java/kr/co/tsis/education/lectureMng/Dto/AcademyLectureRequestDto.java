package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AcademyLectureRequestDto {
    private String academyId = null;
    private String lectureTitle = null;

    @Builder
    public AcademyLectureRequestDto(String academyId, String lectureTitle) {
        this.academyId = academyId;
        this.lectureTitle = lectureTitle;
    }
}
