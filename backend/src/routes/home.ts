import axios from "axios";
import expressRouter, { Router, Request, Response, application } from "express";
import pool from "../db";
const router: Router = expressRouter.Router();
import authorize from "../middleware/authorize";

// get all of a user's courses
router.get("/", authorize, async (req: any, res: Response) => {
  try {
    const userCourses = await pool.query(
      "SELECT course_id from user_course WHERE user_id = $1",
      [req.user.id]
    );

    let courses: Array<any> = [];

    for (let i = 0; i < userCourses.rows.length; i++) {
      const course = await pool.query(
        "SELECT * FROM courses WHERE course_id = $1",
        [userCourses.rows[i].course_id]
      );
      courses.push(course.rows[0]);
    }

    res.send(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// route for adding a relationship between course and user
router.post("/add", authorize, async (req: any, res: Response) => {
  const { subject, code, section, year } = req.body;
  // make sure course is valid
  try {
    const validCourse = await axios.get(
      `https://ubcgrades.com/api/v2/grades/UBCV/${year as string}/${
        subject as string
      }/${code as string}/${section as string}`
    );
  } catch (error: any) {
    return res.status(error.response.status).send(error.response.data.message);
  }
  try {
    // 1. does not exist
    // 2. they arleady have it
    // 3. exists but don't have

    const findCourse = await pool.query(
      "SELECT course_id FROM courses WHERE course_subject = $1 AND course_code = $2 AND course_section = $3 AND course_year = $4",
      [subject, code, section, year]
    );

    // if course does not exist then add it and create a record in user_course
    if (findCourse.rows.length === 0) {
      // add course
      const addCourse = await pool.query(
        "INSERT INTO courses (course_subject, course_code, course_section, course_year) VALUES ($1, $2, $3, $4) RETURNING course_id",
        [subject, code, section, year]
      );
      //  link course to user
      const userCourse = await pool.query(
        "INSERT INTO user_course (user_id, course_id) VALUES ($1, $2)",
        [req.user.id, addCourse.rows[0].course_id]
      );
      return res.send("Added course successfully!");
      // if course does exist
    } else {
      const userCourse = await pool.query(
        "SELECT * FROM user_course WHERE user_id = $1 AND course_id = $2",
        [req.user.id, findCourse.rows[0].course_id]
      );

      // if course does not belong to user already
      if (userCourse.rows.length === 0) {
        const addCourse = await pool.query(
          "INSERT INTO user_course (user_id, course_id) VALUES ($1, $2)",
          [req.user.id, findCourse.rows[0].course_id]
        );
        // already exists (do nothing)
      } else {
        return res
          .status(401)
          .send("Course already exists attached to that user!");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// remove course
router.delete("/course/:id", authorize, async (req: any, res: Response) => {
  try {
    const deleteCourse = await pool.query(
      "DELETE FROM user_course WHERE user_id = $1 AND course_id = $2 RETURNING *",
      [req.user.id, req.params.id]
    );

    if (deleteCourse.rows.length === 0) {
      return res.status(401).send("This relation does not exist");
    }

    res.send("Course was removed!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// TODO: create wrapped for year

export default router;
