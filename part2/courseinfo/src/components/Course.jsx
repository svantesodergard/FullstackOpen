const Header = props => <h1>{props.course.name}</h1>
const Total = props => <p><strong>Number of excercises {props.parts.map(part => part.exercises).reduce((a, b) => a + b)}</strong></p> 

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Course = ({course}) => {
    return (
        <>
        <Header course={course} />
        {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        <Total parts={course.parts}/>
        </>
    )
}

export default Course
