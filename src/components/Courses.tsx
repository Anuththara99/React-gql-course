import React from 'react'
import {Query} from 'react-apollo';
// import gql from 'graphql-tag';
import { render } from 'react-dom';
import { useQuery, gql } from '@apollo/client'; 

interface Course{
    courseId:string;
    courseName:string;
    courseLeader:string;
}

interface CourseData{
    allCourses:Course[];
}

const GET_ALL_COURSES = gql`
query{
    allCourses{
      courseId
      courseName
      courseLeader
    }
  }
   
`;

function Courses(){
    const {loading,error,data} = useQuery<CourseData>(GET_ALL_COURSES);

    if(loading) return <p>loading...</p>;
    if(error) return <p>Error..</p>;
    
    
    return (
        <div>
            <h3>Courses</h3>
            <table>
                <thead>
                    <tr>
                         <th>Course Id</th>
                         <th>Course Name</th>
                         <th>Course Leader</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {data && data.allCourses.map(course => (
                    <tr>
                        <td key={course.courseId}>{course.courseId}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseLeader}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )

}

export default Courses;