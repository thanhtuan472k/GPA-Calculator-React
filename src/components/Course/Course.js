import React from "react";
import style from "./index.module.css";

const Course = ({
  course,
  removeCourse,
  updateCode,
  updateGrade,
  updateLoad,
}) => {
  return (
    <tr className={style.course_row}>
      <td>
        <input
          className="form-control"
          type="text"
          defaultValue={course.code}
          onChange={(e) => {
            updateCode(course.id, e.currentTarget.value);
          }}
        />
      </td>
      <td>
        <select
          className="form-control"
          defaultValue={course.grade}
          onChange={(e) => {
            updateGrade(course.id, e.currentTarget.value);
          }}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </td>
      <td
        className={`d-flex align-items-center justify-content-between ${style.flex}`}
      >
        <input
          className="form-control"
          type="number"
          defaultValue={course.load}
          onChange={(e) => {
            updateLoad(course.id, Number(e.currentTarget.value));
          }}
        />
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            removeCourse(course.id);
          }}
        >
          <path
            d="M12.885 0L7.5 5.385L2.115 0L0 2.115L5.385 7.5L0 12.885L2.115 15L7.5 9.615L12.885 15L15 12.885L9.615 7.5L15 2.115L12.885 0Z"
            fill="#D51313"
          />
        </svg>
      </td>
    </tr>
  );
};

export default Course;
