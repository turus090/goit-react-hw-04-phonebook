import propTypes from 'prop-types'
import s from "./form.module.css"
import Button from "../button/Button"
import {Component} from "react"
import { Notify } from 'notiflix'

class Form extends Component { 
    constructor(setNewContact) { 
        super()
    }
    state = { 
        name: "",
        phone: ""
    }
    handleUpdate = (formName, formData) => { 
        this.setState(prevState => ({
            [formName]: formData
        }))
    }
    handleCreate = () => { 
        if (this.state.name.length === 0 || this.state.phone.length === 0) {
            Notify.warning("Please enter  name or phone number")
        } else {
            this.props.setNewContact(this.state)
            this.setState({
                name:"",
                phone:""
            })
            }
    
    }
    render(){ 
        return(
            <form className={s.form}>
                <p className={s.title}> Create new contact</p>
                <input className={s.wrapper}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={this.state.name}
                onChange={e=> this.handleUpdate('name', e.target.value)}
                placeholder="Entry new name"
                />
                <input className={s.wrapper}
                type="tel"
                name="number"
                value={this.state.phone}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                placeholder="Entry new phone number"
                onChange={e=> this.handleUpdate('phone', e.target.value)}
                />
                <Button text="Add contact" handleClick={this.handleCreate}/>
            </form>
        )
    }
}

Form.propTypes = {
setNewContact: propTypes.func
}

export default Form