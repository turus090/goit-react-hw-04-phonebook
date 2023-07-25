import propTypes from 'prop-types'
import s from "./filter.module.css"

const Filter = ({filterValue, changeEvent}) => {

    return(
        <div className={s.block}>
            <p className={s.text}>Find contacts by name</p>
            <input 
                value={filterValue}
                onChange={(e) => {changeEvent(e.target.value)}} 
                className={s.inputFilter} 
                placeholder="Entry name"
            />
        </div>
    )
}

Filter.propTypes = {
    filterValue: propTypes.string,
    changeEvent: propTypes.func
}

export default Filter