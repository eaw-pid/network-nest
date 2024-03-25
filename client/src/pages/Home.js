import React from 'react'
import { useOutletContext } from 'react-router-dom'

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
            <div className="landing-homepage">
                <div className="homepage-words">
                    <h1>Finally, manage all of your </h1>
                    <h1>professional relationships</h1>
                    <br/>
                    <h2>Keep track of your professional contacts</h2>
                    <h2>to maximize your networking abilities</h2>
                </div>
            </div>
        )}

export default Home 

