import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({
    children,
    authentication=true,

}){

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{

        // not understood properly the else if part
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authentication,navigate,authStatus])

    return loader ? <h1>Loading...</h1> : <>{children}</>




}