package kr.co.tsis.education.employee;


import javax.servlet.http.HttpSession;

import kr.co.tsis.education.categoryByLecture.CategoryByLectureService;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.util.HttpConnection;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequestMapping("/employee")
public class EmployeeController
{
	@Autowired
	private EmployeeService employeeService;

	@GetMapping("/login")
    public String login(String userid, String pwd, HttpSession session) throws IOException {

		String input = "CPCODE="+"G002"+"&ID="+userid+"&PWD="+pwd;

		String login_result = HttpConnection.PostData("https://www.t-ammo.com/IGWS/loginLegacy_.json",input);

		System.out.println(login_result);

		JSONObject jsonObj = new JSONObject(login_result);

		if(jsonObj.getString("RESULT").equals("SUCCESS")){
			//1. DB에 정보가 있는지 검사
			if(employeeService.check(userid)){
				//1-1. 있으면 그냥 로그인
				Employee employee = employeeService.login(userid);

				session.setAttribute("loginUser", employee);
			} else {
				//1-2. 없으면 처음 사용자
				String search_input = "&ID="+userid;

				String employeeResult = HttpConnection.PostData("http://211.53.18.197:8081/3rdParty_Store/DEF_0103",search_input);
				JSONObject employeeJson = new JSONObject(employeeResult);

				//디비에 추가~
				Employee employee = new Employee();
				employee.setEmpId(userid);
				employee.setEmpName(employeeJson.getString("KOR_NM"));
				employee.setEmpPosition(employeeJson.getString("PSIT_NM").split("/")[0].replaceAll(" ", ""));
				employee.setEmpYears(employeeJson.getInt("PSIT_CNT"));
				employee.setEmpTeam(employeeJson.getString("VW_PLA_NM"));
				employee.setSurveyYn(0);
				employee.setAuthority(0);
				employeeService.signup(employee);
				session.setAttribute("loginUser", employee);
			}
			return "main";
		} else {
			//1. "RESULT_MSG":"아이디가 존재하지 않습니다."
			//2. "RESULT_MSG":"비밀번호가 일치하지 않습니다."
			return "redirect:login?result=fail&RESULT_MSG="+jsonObj.getString("RESULT_MSG");
		}
    }

	@GetMapping("/logout")
	public String logout(HttpSession session) throws IOException {
		session.invalidate();
		return "index";
	}
}
