import PropTypes from 'prop-types'

const Button = ({color, title, onClick}) => {
    return (
        <button  className='btn'  onClick={onClick} style={{ backgroundColor: color }}>{title}</button>
    )
}

Button.defaultProps = {
    color: "steelblue",
}

Button.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
}




export default Button
