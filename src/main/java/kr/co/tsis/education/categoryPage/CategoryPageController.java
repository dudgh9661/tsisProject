package kr.co.tsis.education.categoryPage;

import kr.co.tsis.education.categoryByLecture.CategoryByLectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class CategoryPageController {

    @Autowired
    private CategoryPageService cpService;

}
