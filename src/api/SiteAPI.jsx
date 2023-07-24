import { SERVER_ADDR } from "../configs/config";

export const getRefreshToken = async (refreshToken) => {
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`
            }
        }
        const response = await fetch(`${SERVER_ADDR}/refresh-token`, options);
        
        const data = await response.json();
        console.log(data)

        return {data: data, ok: response.ok}

}