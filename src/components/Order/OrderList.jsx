import './orderList.css'
import { RefreshToken } from '../../configs/config'
import OrderItem from './OrderItem'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getMyOrders } from '../../api/OrderAPI'
import { OrderStatus } from '../../configs/global'


function OrderList(props){
    const navigate = useNavigate();

    const [orderList, setOrderList] = useState([{
        _id: '', recipientInfo: '', finalPrice: '', status: '', createdAt: ''
    }])

    useEffect(() => {
        async function fetchData() {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
                navigate('/login');
                return;
            } 
        
            const token = localStorage.getItem('accessToken');

            let type;
            switch(props.type){
                case('pending'): 
                    type = OrderStatus.PENDING;
                    break;
                case('processing'):
                    type = OrderStatus.PROCESSING;
                    break;
                case('completed'):
                    type = OrderStatus.COMPLETED;
                    break;
                case('canceled'):
                    type = OrderStatus.CANCELED;
                    break;
                default:
                    type = OrderStatus.ALL;
            }
            
            const res = await getMyOrders(token, type, props.limit);
        
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else setOrderList(res.data);
        }
      
        fetchData();
    }, [props.type, props.limit])

    return (
        <div className="order-list-wrap">
            <div className='order-list-header'>
                <div className='order-list-header-id'>
                    <span>Mã đơn hàng</span>
                </div>
                <div className='order-list-header-date'>
                    <span>Ngày mua</span>
                </div>
                <div className='order-list-header-recipient'>
                    <span>Người nhận</span>
                </div>
                <div className='order-list-header-total'>
                    <span>Tổng tiền</span>
                </div>
                <div className='order-list-header-state'>
                    <span>Trạng thái</span>
                </div>
                <div className='order-list-header-see-detail'>
                </div>
            </div>
            <div style={{display:(orderList?.length == 0 ? 'flex' : 'none'),
                  padding: '8px', color: '#7a7e7f', justifyContent:'center'}}
              >
                Bạn chưa có đơn hàng nào.
            </div>
            <div className='order-list-items'>
            {
                orderList.map((item, i)=>{
                    return(
                        <OrderItem key={i} orderInfo={item}/>
                    )
                })
            }
            </div> 
        </div>

    )
}

export default OrderList