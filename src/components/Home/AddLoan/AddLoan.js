import React, { useState, useContext, useEffect } from 'react';
import firebase from 'firebase/compat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { AuthContext } from '../../../context/AuthContext'
import { db } from '../../../firebase/firebase';

import './AddLoan.css'

function AddLoan() {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    
    const [open, setOpen] = useState(false);

    const { currentUser }  = useContext(AuthContext)

    const handleAddLoanOpen = () => {
      setOpen(true);
    };
  
    const handleAddLoanClose = () => {
      setOpen(false);
    };

    const addNewLoan = () => {
        if(name && amount) {
            db.collection('users').doc(currentUser.uid).collection('loans').add({
                name: name,
                amount: amount,
                description: description,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                returned: false
            })
        }
        setOpen(false);
        setName('')
        setAmount('')
        setDescription('')
    }


    return (
        <div className='addLoan'>
            <button className='addLoan_btn' onClick={handleAddLoanOpen}>Add Loan</button>
            <Dialog 
                open={open} 
                onClose={handleAddLoanClose}
                PaperProps={{
                    style: {
                      backgroundColor: '#ffe680',
                    },
                }}
            >
                <DialogTitle>Add Loan</DialogTitle>
                <DialogContent>
                    <div className='addLoan__body'>
                        <div className='addLoan__div'>
                            <label>Name</label>
                            <input id="name" type="text" placeholder='lloyd Shibu' value={name} onChange={(e) => setName(e.target.value)} className='addLoan__input'/>
                        </div>

                        <div className='addLoan__div'>
                            <label>Amount</label>
                            <input id="amount" type="text" placeholder='350' value={amount} onChange={(e) => setAmount(Number(e.target.value.replace(/[^0-9]/g, "")))} className='addLoan__input'/>
                        </div>

                        <div className='addLoan__div'>
                            <label>Description</label>
                            <textarea id="description" type="text" placeholder='Pizza at Dominoes....' value={description} onChange={(e) => setDescription(e.target.value)} className='addLoan__input textarea'/>
                        </div>
                        
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={addNewLoan} className='addButton'>Add</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddLoan
