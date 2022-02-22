import axios from "axios";

export default async (courses: Array<any>) => {
  // for each course:
  // 1. compare your grade to average (you got above average in __ courses)
  // (you did below average in ___ courses)
  // 2. your favourite subject was :
  // check if > 30% is in one subject ... if not then say you did not have a favourite
  // 3. your top grade was __ in CPSC
  // 4. your lowest grade was ___ in CPSC
  // for (let i = 0; i < courses.length; i++) {
  //   const course = await axios.get(`https://ubcgrades.com/api/v2/grades/UBCV/${course.course_year as string}/${
  //     subject as string
  //   }/${code as string}/${section as string}`);
  // }
  try {
    for (let i: number = 0; i < courses.length; i++) {
      console.log(courses[i]);
      // const course = await axios.get(
      //   `https://ubcgrades.com/api/v2/grades/UBCV/${
      //     courses[i].course_year as string
      //   }/${courses[i].course_subject as string}/${
      //     courses[i].course_id as string
      //   }/${courses[i].course_section as string}`
      // );
      const course = await axios.get(
        `https://ubcgrades.com/api/v2/grades/UBCV/${"2019W"}/${"CPSC"}/${"110"}/${"101"}`
      );
      const data = course.data;
      const average = Math.round(data.average);
      const enrolled = data.enrolled;
      console.log(course.data);
    }
  } catch (error: any) {
    console.log(error.message);
    return "Error!";
  }

  return {
    aboveAverage: 1,
    belowAverage: 2,
    topGrade: { course: "CPSC", grade: 100 },
    worstGrade: { course: "CPSC", grade: 20 },
    otherMessages: [],
    overallAverage: 100,
  };
};
