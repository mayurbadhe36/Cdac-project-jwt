package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Jaas;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Assignment;
import com.app.entities.AssignmentAnswer;
import com.app.entities.NoticeBoard;
import com.app.entities.Role;
import com.app.entities.TimeTable;
import com.app.entities.User;
import com.app.repository.IAssignmentAnswerRepository;
import com.app.repository.IAssignmentRepository;
import com.app.repository.INoticeboardRepository;
import com.app.repository.ITimetableRepository;
import com.app.repository.IUserRepository;

@Service
public class FacultyServiceImpl implements IFacultyService {

	@Autowired
	private INoticeboardRepository noticeRepo;

	@Autowired
	private IAssignmentRepository assignRepo;

	@Autowired
	private IUserRepository userRepo;

	@Autowired
	private IAssignmentAnswerRepository answerRepo;

	@Autowired
	private ITimetableRepository timetableRepo;

	@Override
	public Assignment addAssignment(Assignment assignment, Long facultyId, String filecode) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		assignment.setFaculty(u);
		assignment.setFileName(filecode);
		return assignRepo.save(assignment);
	}

	@Override
	public List<Assignment> getAllAssignment() {
		return assignRepo.findAll();

	}

	@Override
	public List<Assignment> getAssignmentByFaculty(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return assignRepo.findByFaculty(u);
	}

	@Override
	public NoticeBoard addNoticeBoard(NoticeBoard notice, Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		notice.setFaculty(u);
		return noticeRepo.save(notice);
	}

	@Override
	public List<NoticeBoard> getAllNoticeBoard() {

		return noticeRepo.findAll();
	}

	@Override
	public List<TimeTable> getAllTimeTableByFacultyId(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return timetableRepo.findByFaculty(u);
	}

	@Override
	public List<TimeTable> getAllTimeTable() {
		return timetableRepo.findAll();
	}
//
//	@Override
//	public List<NoticeBoard> getNoticeByFaculty(Long facultyId) {
//		return noticeRepo.findByFaculty(facultyId);
//	}
//
//	@Override
//	public NoticeBoard getNoticeById(Long id) {
//		return noticeRepo.findById(id).get();
//	}
//
//	@Override
//	public NoticeBoard updateNoticeboard(NoticeBoard notice) {
//		return noticeRepo.save(notice);
//	}

//	@Override
//public boolean deleteNotice(long id) {
//		NoticeBoard n = noticeRepo.findById(id).get();
//	if (n != null) {
//			noticeRepo.delete(n);
//			return true;
//	}
//		return false;
//	}

//	@Override
//	public Assignment getAssignmentById(long id) {
//		return assignRepo.findById(id).get();
//	}
//
//	@Override
//	public Assignment updateAssignment(Assignment assignment) {
//		return assignRepo.save(assignment);
//	}
//
//	@Override
//	public boolean deleteAssignment(long id) {
//		Assignment a = assignRepo.findById(id).get();
//		if (a != null) {
//			assignRepo.delete(a);
//			return true;
//		}
//
//		return false;
//	}
//
//	@Override
//	public List<AssignmentAnswer> getAllSubmitAnswerByFacultyId(long id) {
//		return answerRepo.findByFacultyId(id);
//	}
//
//	@Override
//	public AssignmentAnswer getAssignmentAnswerById(long id) {
//		return answerRepo.findById(id).get();
//	}
//
//	@Override
//	public boolean updateGrade(long aid, String grade) {
//		AssignmentAnswer as = answerRepo.findById(aid).get();
//		if (as != null) {
//			as.setGrade(grade);
//			as.setId(aid);
//			answerRepo.save(as);
//			return true;
//		}
//
//		return false;
//	}
//
//	@Override
//	public String checkGrade(long fid, long aid) {
//		AssignmentAnswer as = answerRepo.findByFacultyAndId(fid, aid);
//		if (as != null) {
//			return as.getGrade();
//		}
//		return null;
//	}
//
//	@Override
//	public User updateProfile(User u) {
//
//		User oldUser = userRepo.findById(u.getId()).get();
//
//		if (oldUser != null) {
//			u.setPassword(oldUser.getPassword());
//			u.setRole(oldUser.getRole());
//			return userRepo.save(u);
//		}
//
//		return null;
//	}

//	@Override
//	public TimeTable getTimeTableById(long id) {
//		return timetableRepo.findById(id).get();
//	}

//
//	@Override
//	public boolean deleteTimeTable(long id) {
//		TimeTable time = timetableRepo.findById(id).get();
//		if (time != null) {
//			timetableRepo.delete(time);
//			return true;
//		}
//		return false;
//	}
//
//	@Override
//	public TimeTable updateTimeTable(TimeTable timeTable) {
//		return timetableRepo.save(timeTable);
//	}

	@Override
	public List<User> getAllStudentByRoleStudent() {
		return userRepo.findByRole(Role.ROLE_STUDENT);
	}

	@Override
	public List<NoticeBoard> getNoticeBoardByFaculty(Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		return noticeRepo.findByFaculty(u);
	}

	@Override
	public TimeTable addTimeTable(@Valid TimeTable timetable, Long facultyId) {
		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Faculty ID !!!!!!!"));
		timetable.setFaculty(u);
		return timetableRepo.save(timetable);
	}

	@Override
	public String deleteNoticeBoardById(Long id) {
		NoticeBoard notice = noticeRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid NoticeBoard ID !!!!!!!"));
		noticeRepo.delete(notice);

		return "Noticeboard Deleted Succesfully ";
	}

	@Override
	public NoticeBoard getNoticeBoardById(Long id) {
		NoticeBoard notice = noticeRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid NoticeBoard ID !!!!!!!"));
		return notice;
	}

	@Override
	public NoticeBoard updateNoticeBoardDetails(NoticeBoard detachedNoticeBoard, Long id) {
		NoticeBoard notice = noticeRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid NoticeBoard ID !!!!!!!"));
		notice.setModuleName(detachedNoticeBoard.getModuleName());
		notice.setDate(detachedNoticeBoard.getDate());
		notice.setDescription(detachedNoticeBoard.getDescription());
		noticeRepo.save(notice);
		return notice;
	}

	@Override
	public String deleteTimeTableById(Long id) {

		TimeTable timetable = timetableRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));
		timetableRepo.delete(timetable);
		return "TimeTable Deleted Succesfully ";
	}

	@Override
	public TimeTable getTimeTableById(Long id) {
		TimeTable timetable = timetableRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));
		return timetable;
	}

	@Override
	public TimeTable updateTimeTableDetails(TimeTable detachedTimeTable, Long id) {

		TimeTable timetable = timetableRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));

		timetable.setModuleName(detachedTimeTable.getModuleName());
		timetable.setDate(detachedTimeTable.getDate());
		timetable.setStartTime(detachedTimeTable.getStartTime());
		timetable.setEndTime(detachedTimeTable.getEndTime());
		timetable.setPlatform(detachedTimeTable.getPlatform());
		timetable.setLink(detachedTimeTable.getLink());
		timetableRepo.save(timetable);
		return timetable;

	}

	@Override
	public List<AssignmentAnswer> getAllAssignmentAnswerByFacultyId(Long facultyId) {

		User u = userRepo.findById(facultyId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid TimeTable ID !!!!!!!"));

		List<AssignmentAnswer> aa = answerRepo.findByFaculty(u);

		return aa;
	}

	@Override
	public AssignmentAnswer updateStudentGradeByAssignmentAnswerId(String grade, Long id) {
		AssignmentAnswer aa = answerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid AssignmentAnswer  ID !!!!!!!"));
		aa.setGrade(grade);
		answerRepo.save(aa);
		return aa;
	}

	@Override
	public AssignmentAnswer updateStudentRemarkByAssignmentAnswerId(String remark, Long id) {
		AssignmentAnswer aa = answerRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid AssignmentAnswer  ID !!!!!!!"));
		aa.setRemark(remark);
		answerRepo.save(aa);
		return aa;
	}

}
