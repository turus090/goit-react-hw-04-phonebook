import propTypes from 'prop-types'
import s from "./form.module.css"
import Button from "../button/Button"
import {useState} from "react"
import { Notify } from 'notiflix'

const Form = ({setNewContact}) =>{
    const [form, setForm] = useState({
        name: "",
        phone: ""
    })
    const handleUpdate = (formName, formData) => {
        setForm({
            ...form,
            [formName]: formData
        })
    }
    const handleCreate = () =>{ 
        if(form.name.length === 0 || form.phone.length === 0){
            Notify.warning("Please enter  name or phone number")
        } else {
            setNewContact(form)
            setForm({
                name:"",
                phone:""
            })
        }
    }
    return(
        <form className={s.form}>
            <p className={s.title}> Create new contact</p>
            <input className={s.wrapper}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={form.name}
            onChange={e=> handleUpdate('name', e.target.value)}
            placeholder="Entry new name"
            />
            <input className={s.wrapper}
            type="tel"
            name="number"
            value={form.phone}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Entry new phone number"
            onChange={e=> handleUpdate('phone', e.target.value)}
            />
            <Button text="Add contact" handleClick={handleCreate}/>
        </form>
    )
}
Form.propTypes = {
    setNewContact: propTypes.func
    }
export default Form