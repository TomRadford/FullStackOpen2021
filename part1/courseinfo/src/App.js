import React from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )

};

const Content = (props) => {
  return (
    <div>
       <Part part={props.parts[0].name} exercises={props.parts[0].excercises} />
       <Part part={props.parts[1].name} exercises={props.parts[1].excercises} />
       <Part part={props.parts[2].name} exercises={props.parts[2].excercises} />
    </div>
  )
};

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>

  )
};

const Total = (props) => {
  return (
    <>
      <p>Number of excercises {props.total}</p>
    </>
  )
};

const App = () => {
  const course = {  
   name: 'Half Stack application development',
   parts: [
    {name: 'Fundamentals of React',
    excercises: 10},
    {name: 'Using props to pass data',
    excercises: 7},
    {name: 'State of a component',
    excercises: 14 }
   ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total total={course.parts[0].excercises + course.parts[1].excercises + course.parts[2].excercises} />
    </div>

  )
};

export default App;