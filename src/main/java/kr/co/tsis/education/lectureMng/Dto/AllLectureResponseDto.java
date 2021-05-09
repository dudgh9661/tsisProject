package kr.co.tsis.education.lectureMng.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class AllLectureResponseDto {
    private int totalPage;
    private List<LectureResponseDto> lectureResponseDtoList;

    @Builder
    public AllLectureResponseDto(int totalPage, List<LectureResponseDto> lectureResponseDtoList) {
        this.totalPage = totalPage;
        this.lectureResponseDtoList =lectureResponseDtoList;
    }
}
