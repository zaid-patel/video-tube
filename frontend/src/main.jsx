import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/register.jsx'
import Channel from './pages/channel.jsx'
import SubscribedChannels from './pages/subscribedChannels.jsx'
import AddVideo from './pages/addVideo.jsx'
import WatchHistory from './pages/watchHistory.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import AuthLayout from './components/authLayout.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Video from './components/video.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                 </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Register />
                 </AuthLayout>
            ),
        },
        {
            path: "/users/:userId",
            element: (
                <AuthLayout authentication>
                     {" "}
                    <Channel />
                 </AuthLayout>
            ),
        },
        {
            path:"/search/:query",
            element:<Home />
        },
        {
            path: "/addvideo",
            element: (
                <AuthLayout authentication>
                    {/* // {" "} */}
                    <AddVideo />
                 </AuthLayout>
            ),
        },
        {
            path: "/subscribedchannels",
            element: (
                <AuthLayout authentication>
                    {/* // {" "} */}
                    <SubscribedChannels />
                 </AuthLayout>
            ),
        },
        {
            path: "/watchHistory",
            element: (
              <AuthLayout authentication>
                  {/* // {" "} */}
                  <WatchHistory />
               </AuthLayout>
          ),
        },
        {
            path:"/video/:videoId",
            element: (
                // {" "}
                <AuthLayout authentication>
                    {/* // {" "} */}
                    <Video />
                 </AuthLayout>
            ),
        }
        // // {
        //     path:"/video/:videoId",
        //     element:{
        //         <AuthLayout authentication>
        //         <Video
        //         </AuthLayout>
        //     }
        // },
        // {
        //     path: "/:name/posts",
        //     element:(
        //         <AuthLayout authentication>
        //             { " "}
        //             <YourPosts />
        //         </AuthLayout>
        //     ),
        // }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)