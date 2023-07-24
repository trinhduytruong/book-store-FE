import { SERVER_ADDR } from "../configs/config";
import { OrderStatus } from "../configs/global";


export const createOrder = async (token, order) => {
    
    // setup items
    order['items'] = [];
    order.checkedItems.map((e) => {
        let item = {};
        item['titleID'] = e.title._id;
        item['name'] = e.title.name;
        item['image'] = e.title.image;
        item['price'] = e.title.price;
        item['count'] = e.count;
        console.log(item);
        order.items.push(item);
    })
    delete order.checkedItems
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(order)
    };
    const response = await fetch(`${SERVER_ADDR}/order/create`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const getMyOrders = async (token, type = OrderStatus.ALL, limit = null) => {
    let query = `?type=${type}`;
    if(limit) query = query + `&limit=${limit}`;
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/order/my-orders` + query, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const getNumberOfOrderTypes = async (token) => {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/order/num-of-types`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const getOrderDetail = async (token, id) => {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(`${SERVER_ADDR}/order/my-orders/detail/${id}`, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}