package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecommendLectureRequestDto {
    private String lectureTitle = null;
    private int themeLectureId =  0;

    @Builder
    public RecommendLectureRequestDto(String lectureTitle, int themeLectureId) {
        this.lectureTitle = lectureTitle;
        this.themeLectureId = themeLectureId;
    }
}
