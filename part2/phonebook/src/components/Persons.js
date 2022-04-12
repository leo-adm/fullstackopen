import PersonDetails from "./PersonDetails"

const Persons = ({ persons, handleDelete }) => 
  persons.map(person =>
    <PersonDetails key={person.name} person={person} handleDelete={handleDelete}/>
  )

export default Persons