import { SERVER_ADDR } from "../configs/config";

export const getAllCartItems = async (token) => {
 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/cart`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const getCheckedCartItems = async (token) => {
 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/cart?isChecked=true`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const checkAllCartItems = async (token, checked) => {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/cart/check-all?checked=${checked}`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const updateCartItem = async (token, cartID, newData) => {
   
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(newData)
    };
    const response = await fetch(`${SERVER_ADDR}/cart/update?id=${cartID}`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const addCartItem = async (token, newItem) => {
   
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({
            titleID: newItem.titleID,
            count: newItem.count ?? 1,
            isChecked: newItem.isChecked ?? false
        })
    };
    const response = await fetch(`${SERVER_ADDR}/cart/add`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const deleteCartItem = async (token, cartID) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/cart/delete?id=${cartID}`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}