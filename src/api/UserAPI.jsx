import { SERVER_ADDR } from "../configs/config";

export const getAccountInfo = async (token, filter=[]) => {

    const query = filter.length == 0 ? '' : '?f=' + filter.join(';');
 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/user/profile` + query, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const updateAccountInfo = async (token, account) => {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
            lastname: account.lastname,
            firstname: account.firstname,
            email: account.email,
            phoneNumber: account.phoneNumber,
            gender: account.gender,
            address: account.address
        })
    };
    const response = await fetch(`${SERVER_ADDR}/user/update-profile`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}