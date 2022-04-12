const PersonForm = ({ HandleSubmit, nameValue, HandleNameChange, numberValue, HandleNumberChange}) => {
  return (
    <form onSubmit={HandleSubmit}>
      <div>
        Name: 
        <input 
          value={nameValue}
          onChange={HandleNameChange}
        />
      </div>
      <div>
        Number: 
        <input 
          value={numberValue}
          onChange={HandleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm