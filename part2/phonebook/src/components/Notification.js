const Notification = ({ message, isSuccess }) => {
  if(message === null)
    return null
  
  const style = {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: isSuccess ? 'green' : 'red'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification