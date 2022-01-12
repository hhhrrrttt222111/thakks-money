import React, { useState, useContext } from 'react';
import firebase from 'firebase/compat'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { TiTickOutline } from "react-icons/ti";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

import { AuthContext } from '../../../context/AuthContext'
import { db } from '../../../firebase/firebase';

import './SingleLoan.css'

function SingleLoan({ data, id, no }) {

    const [newAmount, setNewAmount] = useState(0)
    const { currentUser }  = useContext(AuthContext)


    const paidMoney = () => {
        db.collection('users').doc(currentUser.uid).collection('loans').doc(id)  
        .delete()  
    }

    const addMoney = () => {
        db.collection('users').doc(currentUser.uid).collection('loans').doc(id).update({
            amount: firebase.firestore.FieldValue.increment(newAmount)
        })
    }
    const reduceMoney = () => {
        db.collection('users').doc(currentUser.uid).collection('loans').doc(id).update({
            amount: firebase.firestore.FieldValue.increment(newAmount *- 1)
        })
    }

    console.log(typeof((newAmount)))

    return (
        <div className='singleLoan' key={id}>
            <Accordion  
                style={{backgroundColor: `${no%2===0 ? '#ffe680' : '#ffe066'}`}}              
                >
                <AccordionSummary aria-controls="panel1a-content" id={id}>
                    <div className='sl__title'>
                        <p className='sl__no'>{no+1}.</p>
                        <h1 className='sl__name'>{data.name}</h1>
                        <p className='sl__amount'>{data.amount} Rs</p>
                        <div className='sl__status'>
                            <TiTickOutline onClick={paidMoney}  className='status_icon'/>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='sl__body'>
                        <p>{data.description}</p>
                        <div className='sl__options'>
                            <div className="slider_btns">
                                <div className="slider_btns_action">
                                    <IoIosRemove className="slider_subtractBtn" onClick={reduceMoney}/>
                                        <input type='text' value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value.replace(/[^0-9]/g, "")))} />
                                    <IoIosAdd className="slider_addBtn" onClick={addMoney}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default SingleLoan
