import axios from 'axios'

const login=async(data)=>{
    let userData,error
    await axios.post('api/v1/users/login', {
         email:data.email,
         password:data.password,
      })
      .then(function (response) {
        console.log(response.data?.data);
        userData=response.data?.data
        // console.log(userData)

      })
      .catch(function (err) {
        console.log("authservive :: login ",err);
        error=err 

      });


    //   console.log(userData)
    return {userData,error}
}

const createAccount=async(data)=>{
    let userData,error
    const formData={
        ...data,
        avatar:data.avatar[0]
    }
    console.log(formData)
    await axios.post('api/v1/users/register',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Important header for file uploads
        }
    }

      )
      .then(function (response) {
        console.log(response.data?.data);
        userData=response.data?.data
        // console.log(userData)

      })
      .catch(function (err) {
        console.log("authservive :: register ",err);
        error=err 

      });


    //   console.log(userData)
    return {userData,error}

}


const logout=async()=>{
    let message
    try {
        message=await axios.post('api/v1/users/logout')
    } catch (error) {
        message=error.message
    }
    console.log(message)

    return message.data.message;

    
}
export {login,createAccount,logout}