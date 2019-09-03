import { createContext } from 'react';
import { observable, action } from 'mobx'
import { fetchContactSevice } from 'service/Dashboard.service'

class Dashbaord {

    @observable
    contacts = null 

    @action
    getContacts = async () => {
        this.contacts = await fetchContactSevice()
    }

    @action
    setContacts = async data => {
        this.contacts = data
    }

}

export const DashbaordStore = createContext(new Dashbaord())