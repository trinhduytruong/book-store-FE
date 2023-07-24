import { SERVER_ADDR } from "../configs/config";

export const login = async (account) => {

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: account.phoneNumber,
          password: account.password
        }),
        // credentials: 'include' // to get cookie but don't success yet
      }

      const response = await fetch(`${SERVER_ADDR}/user/login`, options);
      
      const data = await response.json();
      console.log(data)

      return {data: data, status: response.status, ok: response.ok};
} 

export const signup = async (account) => {
    
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: account.phoneNumber,
          password: account.password
        })
    }

    const response = await fetch(`${SERVER_ADDR}/user/create`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};
    
}