import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ({title, onAdd, showAdd}) => {
    const Location = useLocation()


       return (
        <header className="header">
            <h1 style={headingStyle}> {title} </h1>
            {Location.pathname === '/' && 
            <Button color={showAdd ? 'red' : 'green'} title={showAdd ? 'Close' : 'Add'} onClick={onAdd}/> }
        </header>
    )
}

Header.defaultProps = {
    title : "Task Tracker",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

const headingStyle = {
        
    }

export default Header
