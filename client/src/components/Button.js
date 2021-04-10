import PropTypes from 'prop-types'

//will likely have to add some sort of size styling in props as well
//rounded rectangle button which is consistent but size differs 
const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: '#1DB954',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
