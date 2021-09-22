import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { gql, useMutation } from '@apollo/client'; 


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

const ADD_COURCE = gql`
mutation createCourse($courseInput:CourseInput){
    createCourse(courseInput: $courseInput){
      courseId
      courseName
      courseLeader
    }
  }
`;

const GET_ALL_COURSES = gql`
query{
    allCourses{
      courseId
      courseName
      courseLeader
    }
  }
   
`;

function AddCourse(){

   

    //Create Course States
    const [courseId, setId] = useState('');
    const [courseName, setName] = useState('');
    const [courseLeader, setLeader] = useState('');


    const [createCourse,{ error,data}] = useMutation<{createCourse :NewCourseData,courseInput :NewCourseVars}>
    (ADD_COURCE,{variables: { courseInput: { courseId, courseName, courseLeader } },refetchQueries :["allCourses"]});

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
    
    if(error){
        console.log('error :',error.message)
    }
    if(data){
        console.log(createCourse)
    }

    return (
        <div>
            <h3>
                Add Course
            </h3>
            
            <form>
                <Box  component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },
        }} noValidate autoComplete="off">


                <TextField id="outlined-basic" label="Course Id" value={courseId} onChange ={(e)=>setId(e.target.value)} variant="outlined" />
                <TextField id="outlined-basic" label="Course Name" value={courseName} onChange ={(e)=>setName(e.target.value)} variant="outlined" />
                <TextField id="outlined-basic" label="Course Leader" value={courseLeader} onChange ={(e)=>setLeader(e.target.value)} variant="outlined" />

                <br />
                <Button variant="contained" color="secondary" 
            onClick={()=>{
                createCourse({ variables:{courseInput:{courseId,courseName,courseLeader}}})}
                } style={{marginTop:5}}>
                    Save
            </Button>


            </Box>
            </form>
            
        </div>
    )
    
}

export default AddCourse;