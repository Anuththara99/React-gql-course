import React ,{ useEffect, useState } from 'react'
// import {Query} from 'react-apollo';
// import gql from 'graphql-tag';
// import { render } from 'react-dom';
import { useQuery, gql,useMutation } from '@apollo/client'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Course{
    courseId:any;
    courseName:string;
    courseLeader:string;
}

interface CourseData{
    allCourses:Course[];
}

interface NewCourse{
    courseId:string;
    courseName:string;
    courseLeader:string;
}

interface NewCourseData{
    createCourse:NewCourse[];
}

interface NewCourseVars{
    courseInput :{
        courseId:string;
        courseName:string;
        courseLeader:string;
    }
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

const ADD_COURSE = gql`
mutation createCourse($courseInput:CourseInput){
    createCourse(courseInput: $courseInput){
      courseId
      courseName
      courseLeader
    }
  }
`;



function Courses(){
    const {loading,error,data,refetch} = useQuery<CourseData>(GET_ALL_COURSES);

    const [courseId, setId] = useState('');
    const [courseName, setName] = useState('');
    const [courseLeader, setLeader] = useState('');

    const [createCourse] = useMutation<{createCourse:NewCourseData,course:NewCourseVars}>
    (ADD_COURSE,{variables: { courseInput: { courseId, courseName, courseLeader } },refetchQueries :["allCourses"]});

    // const handleAddCourses =(e : any)=>{
    //     e.preventDefault();
    //     console.log(createCourse)
    //     createCourse({
    //         variables: { course: 
    //             { courseId:[courseId]
    //             , courseName:[courseName]
    //             , courseLeader :[courseLeader]
    //         } }
    //     })   
    // }


    if(loading) return <p>loading...</p>;
    if(error) return <p>Error..</p>;
    
    
    return (
        <div>
            <div >
            <h3>Courses List</h3>
            {/* <table style={{marginLeft:450,}}>
                <thead>
                    <tr>
                         <th key="{course.courseId}">Course Id</th>
                         <th>Course Name</th>
                         <th>Course Leader</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {data && data.allCourses.map(course => (
                    <tr>
                        <td key="{course.courseId}">{course.courseId}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseLeader}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table> */}
            <TableContainer component={Paper}>
            <Table size="small"  aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="right">Course Id</TableCell>
                    <TableCell align="right">Course Name</TableCell>
                    <TableCell align="right">Course Leader</TableCell>
                    <TableCell align="right">Update</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data && data.allCourses.map((course) => (
                    <TableRow>
                        <TableCell align="right">{course.courseId}</TableCell>
                        <TableCell align="right">{course.courseName}</TableCell>
                        <TableCell align="right">{course.courseName}</TableCell>
                        <TableCell align="right"><Button variant="contained" color="info">Update</Button></TableCell>
                        <TableCell align="right"><Button variant="contained" color="warning">Delete</Button></TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
            </div>
            
            <div>
                <h3>
                    Add Course
                </h3>
                
                <form >
                    <Box  component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },
                }} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Course Id" value={courseId} onChange ={(e)=>setId(e.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" label="Course Name" value={courseName} onChange ={(e)=>setName(e.target.value)} variant="outlined" />
                    <TextField id="outlined-basic" label="Course Leader" value={courseLeader} onChange ={(e)=>setLeader(e.target.value)} variant="outlined" />

                    <br />
                    <Button type="submit" variant="contained" color="secondary"
                     onClick={()=>{
                        createCourse({ variables:{courseInput:{courseId,courseName,courseLeader}}});
                        refetch();
                            }
                        } 
                    style={{marginTop:5}}>
                            Save
                    </Button>
                    
                </Box>
                    
                </form>

                

            </div>
        </div>
    )

}

export default Courses;