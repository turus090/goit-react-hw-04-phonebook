import propTypes from "prop-types"
import s from "./list.module.css"
const ListItem = ({id, name, phone, deleteContact}) => {
    return (
        <li className={s.contactItem} key={id}>
           <div className={s.content}>
             <p>{name}: </p>
             <p>{phone}</p>
           </div>
            <button onClick={()=>{deleteContact(id)}}> Delete </button>
        </li>
    )
}

ListItem.propTypes = {
    id: propTypes.string,
    name: propTypes.string,
    phone: propTypes.string,
    deleteContact: propTypes.func
}

export default ListItem