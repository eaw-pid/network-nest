import React, {useEffect, useState} from 'react'
import { useOutlet, useOutletContext } from 'react-router-dom'

import MyConnects from './MyConnects'



function Home() {

    const {currentUser} = useOutletContext()

   

    if (currentUser) {
        return (
            <div>
                <MyConnects />
            </div> 
            )}
    return (
        <h1>LoggedOut</h1>
        )}

export default Home 

