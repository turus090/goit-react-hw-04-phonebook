import { useState, useEffect } from "react"
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Filter from "./filter/Filter"; 
import Form from "./form/Form";
import List from "./list/List";

import s from "./app.module.css";
import Message from "./message/Message";
const App = () => {
    const [state,setState] = useState({
            contacts: [
              {
                id:'1',
                name:"John",
                phone: '123'
              },
              {
                id:'21',
                name:"John Smith",
                phone: '123'
              },
              {
                id:'3',
                name:"Bob",
                phone: '123'
              },
            ],
            filter: ''
    })
    useEffect(()=>{
        const contacts = JSON.parse(localStorage.getItem('contact'))
        if (contacts) {
          setState({
            ...state,
            contacts: [
              ...contacts
            ]
          })
        }
    }, [state])
    
  const deleteContact = (idCandidate) => {
    setState({
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== idCandidate)
     }
    )
  }
  const changeFilterValue = (newValue) => { 
    setState({
        ...state,
        filter: newValue
      })
  }
  
  const setNewContact = (contactCandidate) => { 
    console.log(contactCandidate)
      const result = state.contacts.find(contactItem => contactItem.name.toLowerCase() === contactCandidate.name.toLowerCase())
      if (result){
        Notify.warning(`${contactCandidate.name} is already in contact`)
        return ({})
      } 
      setState({
            ...state,
            contacts: [
              ...state.contacts,
              {
                id: nanoid(),
                ...contactCandidate
              }
            ]
          }
        )
    
  }
  const startSearch = () => {
    const {contacts, filter}= state
        const result = contacts.filter(contactItem => {
        return contactItem.name.toLowerCase().includes(filter.toLowerCase())
        })
        return result
  }

    return (
      <div>
      <h2 className={s.title}>Phonebook</h2>
      <Form 
        setNewContact = {setNewContact}
      />
      <Filter
        filterValue = {state.filter} 
        changeEvent = {changeFilterValue}
        />
        {
          
          state.contacts.length === 0 ||
          (state.filter.length !== 0 &&  startSearch().length === 0) ?
          <Message text="No items in list"/> : 
          <List 
            list={startSearch()}
            deleteContact={deleteContact} 
          />
        }
      

      </div>
    )
  
}

export default App