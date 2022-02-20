import axios from "axios";

export default async (courses: Array<any>) => {
  // for each course:
  // 1. compare your grade to average (you got above average in __ courses)
  // (you did below average in ___ courses)
  // 2. your favourite subject was :
  // check if > 30% is in one subject ... if not then say you did not have a favourite
  // 3. your top grade was __ in CPSC
  // 4. your lowest grade was ___ in CPSC
  return {
    aboveAverage: 1,
    belowAverage: 2,
    topGrade: { course: "CPSC", grade: 100 },
    worstGrade: { course: "CPSC", grade: 20 },
    otherMessages: [],
    overallAverage: 100,
  };
};
