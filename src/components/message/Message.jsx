
import propTypes from 'prop-types'
import s from "./message.module.css"
const Message = ({text}) => {
    return(
        <p className={s.message}>{text}</p> 
    )
}

Message.propTypes = {
    text: propTypes.string
}
export default Message

