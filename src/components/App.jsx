import { Component } from "react";
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Filter from "./filter/Filter"; 
import Form from "./form/Form";
import List from "./list/List";

import s from "./app.module.css";
import Message from "./message/Message";



class App extends Component {
  state = {
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
  }
  componentDidMount() {
    let contacts = JSON.parse(localStorage.getItem('contact'))
    if (contacts) {
      this.setState({
        ...this.state,
        contacts: [
          ...contacts
        ]
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state)
    localStorage.setItem("contact", JSON.stringify(this.state.contacts));
  }
  deleteContact = (idCandidate) => {
    this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== idCandidate)
     })
    )
  }
  changeFilterValue = (newValue) => { 
    this.setState(prevState => ({
        filter: newValue
      })
    )
  }
  
  setNewContact = (contactCandidate) => { 
    console.log(contactCandidate)
      const result = this.state.contacts.find(contactItem => contactItem.name.toLowerCase() === contactCandidate.name.toLowerCase())
      if (result){
        Notify.warning(`${contactCandidate.name} is already in contact`)
        return ({})
      } 
      this.setState(prevState => ({
            contacts: [
              ...prevState.contacts,
              {
                id: nanoid(),
                ...contactCandidate
              }
            ]
          })
        )
    
  }
  startSearch = () => {
    const {contacts, filter}= this.state
        const result = contacts.filter(contactItem => {
        return contactItem.name.toLowerCase().includes(filter.toLowerCase())
        })
        return result
  }
  render() {
    return (
      <div>
      <h2 className={s.title}>Phonebook</h2>
      <Form 
        setNewContact = {this.setNewContact}
      />
      <Filter
        filterValue = {this.state.filter} 
        changeEvent = {this.changeFilterValue}
        />
        {
          
          this.state.contacts.length === 0 ||
          (this.state.filter.length !== 0 &&  this.startSearch().length === 0) ?
          <Message text="No items in list"/> : 
          <List 
            list={this.startSearch()}
            deleteContact={this.deleteContact} 
          />
        }
      

      </div>
    )
  }
}
export default App
