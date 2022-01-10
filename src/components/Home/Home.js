import React, { useEffect, useState, useContext } from 'react'


import AddLoan from './AddLoan/AddLoan'
import './Home.css'

import { db } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import SingleLoan from './SingleLoan/SingleLoan';

function Home() {

    const [loans, setLoans] = useState([])

    const { currentUser } = useContext(AuthContext)

    console.log(currentUser.uid)

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).collection('loans').onSnapshot(snapshot => (
            setLoans(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        ))

    }, [currentUser.uid]);

    console.log(loans && loans)

    return (
        <div className='home'>
            <h1>Home</h1>
            <div className='home__container'>
                <div className='home_header'>
                    <AddLoan />
                </div>
                <div className='home_body'>
                    {
                        loans && loans.map((loan, no) => (
                            <SingleLoan key={loan.id} id={loan.id} no={no} data={loan.data} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
