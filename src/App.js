import { useState, useEffect } from "react";
import Switch from "./components/Switch/Switch";
import Course from "./components/Course/Course";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [theme, setTheme] = useState("light");
  const [courses, setCourses] = useState([]);
  const [gradeMap, setGradeMap] = useState({
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  });
  const [gpa, setGpa] = useState(0);
  const [comment, setComment] = useState("");

  const updateGpa = (courses) => {
    let totalPointsGotten = courses
      .map((course) => course.load * gradeMap[course.grade])
      .reduce((a, b) => a + b, 0);
    let totalPoints = courses
      .map((course) => course.load)
      .reduce((a, b) => a + b, 0);
    let newGpa = totalPointsGotten / totalPoints;
    setGpa((totalPointsGotten / totalPoints).toFixed(2));

    if (newGpa > 3.6 && newGpa <= 4.0)
      setComment(
        "Học chi mà giỏi dữ, học kiểu này thì sau này giàu rồi nuôi anh luôn nha 😎😎😎🙌"
      );
    if (newGpa >= 3.2 && newGpa <= 3.6)
      setComment("Bằng giỏi luôn kìa. Ny của anh giỏi quá quá đất 😍😍😍");
    if (newGpa >= 2.5 && newGpa < 3.2)
      setComment("Ny đã cố gắng rồi nè. Chiazooooo 🤘💪🤘");

    if (newGpa >= 0 && newGpa <= 2.5)
      setComment("Ơ anh không biết gì hết 🤒🤒");

    localStorage.setItem("courses", JSON.stringify(courses));
  };

  useEffect(() => {
    let courses = localStorage.getItem("courses")
      ? JSON.parse(localStorage.getItem("courses"))
      : [
          {
            code: "Môn yêu anh",
            grade: "A",
            load: 2,
            id: 1,
          },
        ];

    setCourses(courses);
    updateGpa(courses);
  }, []);

  const switchTheme = () => {
    setTheme((oldTheme) => (oldTheme === "light" ? "dark" : "light"));
  };

  const addCourse = () => {
    setCourses((prevCourses) => {
      let newId =
        prevCourses.sort((a, b) => a.id - b.id)[prevCourses.length - 1]?.id + 1;
      newId = newId ? newId : 1;
      return [...prevCourses, { code: "", grade: "F", load: 0, id: newId }];
    });
  };

  const removeCourse = (id) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    );
  };

  const updateLoad = (id, newLoad) => {
    setCourses((prevCourses) => {
      let courseToBeUpdated = {
        ...prevCourses.filter((course) => course.id === id)[0],
      };
      courseToBeUpdated.load = newLoad;
      let final = prevCourses.filter((course) => course.id !== id);
      final.push(courseToBeUpdated);
      final.sort((a, b) => a.id - b.id);
      return final;
    });
  };

  const updateGrade = (id, newGrade) => {
    setCourses((prevCourses) => {
      let courseToBeUpdated = {
        ...prevCourses.filter((course) => course.id === id)[0],
      };
      courseToBeUpdated.grade = newGrade;
      let final = prevCourses.filter((course) => course.id !== id);
      final.push(courseToBeUpdated);
      final.sort((a, b) => a.id - b.id);
      return final;
    });
  };

  const updateCode = (id, newCode) => {
    setCourses((prevCourses) => {
      let courseToBeUpdated = {
        ...prevCourses.filter((course) => course.id === id)[0],
      };
      courseToBeUpdated.code = newCode;
      let final = prevCourses.filter((course) => course.id !== id);
      final.push(courseToBeUpdated);
      final.sort((a, b) => a.id - b.id);
      return final;
    });
  };

  return (
    <div className={`App ${theme}`}>
      <Preloader />
      <div className="shapes" aria-hidden>
        <div className="ball"></div>
        <div className="staircase">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Switch theme={theme} switchTheme={switchTheme} />
      <header className="center">
        <h1>
          <span className="icon">
            <svg
              width="59"
              height="39"
              viewBox="0 0 59 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7049 33.3222C13.8194 33.3222 13.9292 33.2767 14.0102 33.1957C14.0911 33.1147 14.1366 33.0048 14.1366 32.8903V18.4375L28.3745 13.2479C28.489 13.2496 28.5994 13.2058 28.6816 13.126C28.7638 13.0462 28.8109 12.937 28.8126 12.8224C28.8143 12.7079 28.7705 12.5974 28.6907 12.5151C28.6109 12.4329 28.5018 12.3858 28.3873 12.3841L14.1494 17.5737C14.0349 17.5711 13.921 17.5917 13.8146 17.6344C13.7082 17.6771 13.6116 17.741 13.5307 17.8221C13.4488 17.9023 13.3839 17.9981 13.3397 18.1038C13.2955 18.2095 13.2729 18.323 13.2732 18.4375V32.8903C13.2732 33.0048 13.3187 33.1147 13.3996 33.1957C13.4806 33.2767 13.5904 33.3222 13.7049 33.3222Z"
                fill="#3F3D56"
              />
              <path
                d="M29.6759 38.8596C23.3691 38.8181 17.1411 37.4534 11.3943 34.8535C11.0522 34.701 10.7619 34.4522 10.5586 34.1375C10.3553 33.8227 10.2479 33.4556 10.2495 33.0809V17.3512C10.2501 16.8359 10.4549 16.3418 10.8191 15.9774C11.1833 15.6131 11.6771 15.4081 12.1921 15.4075H47.1596C47.6746 15.4081 48.1684 15.6131 48.5326 15.9775C48.8968 16.3418 49.1016 16.8359 49.1022 17.3512V33.0809C49.1038 33.4557 48.9964 33.8227 48.7931 34.1375C48.5899 34.4522 48.2995 34.701 47.9574 34.8535C42.2106 37.4534 35.9827 38.8181 29.6759 38.8596Z"
                fill="#6C63FF"
              />
              <path
                d="M29.6711 26.1166C29.4119 26.1168 29.1552 26.0651 28.9162 25.9647L1.18748 14.2598C0.829895 14.1089 0.525694 13.8542 0.3141 13.5287C0.102505 13.2032 -0.00678502 12.8217 0.000326237 12.4335C0.0074375 12.0452 0.130631 11.668 0.354005 11.3505C0.577378 11.033 0.890691 10.7896 1.25356 10.6519L28.9827 0.126966C29.4293 -0.0433335 29.9231 -0.0422829 30.369 0.129918L57.7265 10.6549C58.0873 10.7937 58.3985 11.0371 58.6203 11.3538C58.8421 11.6706 58.9644 12.0464 58.9715 12.4331C58.9787 12.8198 58.8704 13.1999 58.6604 13.5246C58.4505 13.8494 58.1485 14.1041 57.793 14.2562L30.4352 25.9609C30.1936 26.0638 29.9337 26.1168 29.6711 26.1166Z"
                fill="#6C63FF"
              />
              <path
                d="M13.4873 35.9239C14.9178 35.9239 16.0775 34.7636 16.0775 33.3323C16.0775 31.9011 14.9178 30.7408 13.4873 30.7408C12.0568 30.7408 10.8971 31.9011 10.8971 33.3323C10.8971 34.7636 12.0568 35.9239 13.4873 35.9239Z"
                fill="#3F3D56"
              />
              <path
                opacity="0.2"
                d="M57.8875 12.5947L30.5296 24.2995C30.3163 24.3907 30.0868 24.438 29.8549 24.4386C29.6229 24.4392 29.3932 24.393 29.1795 24.3027L1.45077 12.5982C1.10254 12.4547 0.812018 12.1992 0.625108 11.8721C0.502839 12.0842 0.427079 12.3199 0.402844 12.5636C0.378609 12.8073 0.406462 13.0533 0.484551 13.2854C0.56264 13.5174 0.689176 13.7302 0.855765 13.9096C1.02235 14.089 1.22517 14.2309 1.45077 14.3259L29.1795 26.0304C29.3932 26.1207 29.6229 26.1669 29.8549 26.1663C30.0868 26.1657 30.3163 26.1184 30.5296 26.0272L57.8875 14.3224C58.112 14.2266 58.3136 14.0843 58.479 13.9048C58.6445 13.7254 58.77 13.5128 58.8472 13.2813C58.9245 13.0497 58.9519 12.8043 58.9274 12.5614C58.903 12.3185 58.8273 12.0835 58.7054 11.872C58.5199 12.1965 58.2323 12.4506 57.8875 12.5947Z"
                fill="black"
              />
            </svg>
          </span>
          <span className="primary-text">G.P.A.</span> CALCULATOR
        </h1>
      </header>
      <main>
        <div className="talk-container center">
          <p className="talk my-4">
            Hello Ny đẹp gái cute của anh, hy vọng là em dùng được cái này 1
            cách dễ dàng nè. Em nhập tên môn học, xong chọn điểm chữ rồi chọn
            luôn số chỉ cho môn học đó, mỗi hàng ngang là đại diện cho 1 môn đó.
            Nhập xong hết rồi bấm nút tính điểm là nó tự động tính ra điểm thang
            4 cho em nè. Điểm thang 10 anh chưa làm. Lằn nhằn chổ logic từ lúc
            chuyển điểm từ hệ 4 sang hệ 10 nên anh next qua nha 😖😖.
          </p>
        </div>
        <section className="bottom">
          <div className="bottom-background"></div>
          <section className="bottom-inner">
            <div className="course-table-container">
              <table className="course-table table">
                <thead>
                  <tr>
                    <th>Tên môn học</th>
                    <th>Điểm</th>
                    <th>Số chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <Course
                      course={course}
                      key={course.id}
                      removeCourse={removeCourse}
                      updateCode={updateCode}
                      updateGrade={updateGrade}
                      updateLoad={updateLoad}
                    />
                  ))}
                </tbody>
              </table>
              <div className="btn-container d-flex justify-content-end">
                <button className="add-btn my-3" onClick={addCourse}>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    className="img-fluid"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="18" cy="18" r="18" fill="#00D2A7" />
                    <path
                      d="M18 18H8.39999M18 27.6V18V27.6ZM18 18V8.39999V18ZM18 18H27.6H18Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              className="my-4 calculate-btn"
              onClick={() => {
                updateGpa(courses);
              }}
            >
              Tính Điểm
            </button>
            <p>
              Điểm GPA đây nè: <span className="gpa">{gpa}</span>
            </p>
          </section>
          <section className="closing-comment">{comment}</section>
        </section>
      </main>
      <footer>
        <p>
          Design by{" "}
          <a href="https://trust-akpeti.com" target="_blank" rel="noreferrer">
            Ny đẹp trai của em
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
