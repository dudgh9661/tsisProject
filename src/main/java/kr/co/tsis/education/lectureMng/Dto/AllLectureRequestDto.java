package kr.co.tsis.education.lectureMng.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AllLectureRequestDto {

    private String lectureTitle = null;

    @Builder
    public AllLectureRequestDto(String lectureTitle) {
        this.lectureTitle = lectureTitle;
    }
}
