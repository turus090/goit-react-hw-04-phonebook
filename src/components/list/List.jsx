import propTypes from "prop-types"
import ListItem from "./ListItem"

const List = ({list, deleteContact}) => {
    let listCollection = list.map(item => <ListItem key={item.id} id={item.id} name={item.name} phone={item.phone} deleteContact={deleteContact}/>)
    return (
        <ul>
            {listCollection}
        </ul>
        )
    }

    List.propTypes = {
        list: propTypes.array,
        deleteContact: propTypes.func
    }

export default List