const PersonDetails = ({ person, handleDelete }) => 
  <div>
    <p>{person.name} {person.number}</p>
    <button onClick={() => handleDelete(person)}>Delete</button>
  </div>

export default PersonDetails