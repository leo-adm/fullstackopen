const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.data.part1} exercises={props.data.exercises1}/>
      <Part part={props.data.part2} exercises={props.data.exercises2}/>
      <Part part={props.data.part3} exercises={props.data.exercises3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>{props.number}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const teste = "dsadas"

  return (
    <div>
      <Header courseName={course}/>
      <Content data={{part1, part2, part3, exercises1, exercises2, exercises3}}/>
      <Total number={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App