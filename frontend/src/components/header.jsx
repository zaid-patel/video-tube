import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import LogoutBtn from "./auth/Logout"
import Container from "./Container"
import Logo from "./logo"
import { useSelector } from "react-redux"

function Header(){
    // useEffect
    const {status,userData} = useSelector((state)=>state.auth)
      //  const staus=true
       const navigate = useNavigate()
      // const navigate=useNavigate();
     // console.log(status,userData)
      const items=[
          {
              navItem:'home',
              slug:'/',
              status:true,
          },
        
          {
              navItem:'Channel',
              slug:`/users/${userData?._id}`,
              status:status,
          },
          {
            navItem:'Subscribed Channels',
            slug:`/subscribedchannels`,
            status:status,
          },
          {
              navItem:'AddVideo',
              slug:'/addvideo',
              status:status,
          },
          {
            navItem:'Watch History',
            slug:'/watchHistory',
            status:status,
            // staus:''
          },
          {
              navItem:'Login',
              slug:'/login',
              status:!status,
          },
          {
              navItem:'Signup',
              slug:'/signup',
              status:!status,
          },
          
      ]
      //  console.log(userData);
      
      return(
          
  
         
             <header className='py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px'   />
  
                </Link>
            </div>
            <ul className='flex ml-auto'>
  
                 {
                  
                    items.map((item,index)=>
                       
                      item.status ? (
                          <li key={index}>
                            <button
                            onClick={() => navigate(item.slug)}
                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                            >{item.navItem}</button>
                          </li>
                        ) : null
                    )
                 }
  
            {status && (
            <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
          </Container>
      </header>
      )
  }
  export default Header