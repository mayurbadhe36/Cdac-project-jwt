package com.app.entities;

import java.sql.Date;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "timetable")
public class TimeTable extends BaseEntity {
	@FutureOrPresent(message = "Date Should be in future")
	private Date date;
	@Column(name = "starttime")
	@Future(message = "Time Should be in future")
	private LocalTime startTime;
	@Column(name = "endtime")
	@Future(message = "TIme Should be in future")
	private LocalTime endTime;
//	@NotBlank(message = "faculty id is required")
	@ManyToOne
	@JoinColumn(name = "facultyid")
	private User faculty;
//	@NotBlank(message = "faculty name  is required")
	@Column(name = "facultyname", length = 45)
	private String facultyName;
	@NotBlank(message = "platform  is required")
	@Column(length = 20)
	private String platform;
	@NotBlank(message = "link is required")
	@Column(length = 200)
	private String link;
	@NotBlank(message = "module name  is required")
	@Column(name = "modulename", length = 45)
	private String moduleName;

	public Long getFaculty() {
		return faculty.getId();
	}

//	public String getFacultyName() {
//		return faculty.getName();
//	}

}
