const Header = props => <h1>{props.course}</h1>
const Total = props => <p>Number of excercises {props.excercises.reduce((a, b) => a + b)}</p> 

const Content = props => {
    const Part = (props) => <p>{props.name} {props.exercises}</p>
    return props.parts.map (part => <Part name={part.name} exercises={part.exercises} />)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total excercises={course.parts.map(p => p.exercises)}/>
    </div>
  )
}

export default App
