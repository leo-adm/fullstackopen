const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>Total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {
      parts.map(part => 
        <Part key={part.id} part={part}/>
      )
    }
  </>

const Course = ({ course }) => {
  const sum = course.parts.reduce((acc, curr) => 
    acc += curr.exercises
  ,0)

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={sum}/>
    </>
  )
}

export default Course