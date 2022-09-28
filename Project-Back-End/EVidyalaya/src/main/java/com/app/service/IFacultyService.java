package com.app.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.app.entities.Assignment;
import com.app.entities.AssignmentAnswer;
import com.app.entities.NoticeBoard;
import com.app.entities.TimeTable;
import com.app.entities.User;

public interface IFacultyService {

	public Assignment addAssignment(Assignment assignment, Long facultyId, String filecode);

	public List<Assignment> getAllAssignment();

	public List<Assignment> getAssignmentByFaculty(Long facultyId);

	public NoticeBoard addNoticeBoard(NoticeBoard notice, Long facultyId);

	public List<NoticeBoard> getAllNoticeBoard();

	public List<User> getAllStudentByRoleStudent();

	public List<TimeTable> getAllTimeTable();

	public List<NoticeBoard> getNoticeBoardByFaculty(Long facultyId);

	public List<TimeTable> getAllTimeTableByFacultyId(Long id);

	public TimeTable addTimeTable(@Valid TimeTable timetable, Long facultyId);

	public String deleteNoticeBoardById(Long id);

	public NoticeBoard getNoticeBoardById(Long id);

	public NoticeBoard updateNoticeBoardDetails(NoticeBoard detachedNoticeBoard, Long id);

	public String deleteTimeTableById(Long id);

	public TimeTable getTimeTableById(Long id);

	public TimeTable updateTimeTableDetails(TimeTable detachedTimeTable, Long id);

	public List<AssignmentAnswer> getAllAssignmentAnswerByFacultyId(Long facultyId);

	public AssignmentAnswer updateStudentGradeByAssignmentAnswerId(String grade, Long id);

	public AssignmentAnswer updateStudentRemarkByAssignmentAnswerId(String remark, Long id);

	public String deleteAssignmentById(Long id);

	public Assignment getAssignmentById(Long id);

	public Assignment updateAssignmentDetails(Assignment detachedAssignment, Long id);

}
