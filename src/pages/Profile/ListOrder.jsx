import './listOrder.css'
import './profile.css'
import { useEffect, useState } from 'react';
import CategorySide from '../../components/Profile/CategorySide';
import OrderList from '../../components/Order/OrderList';
import { useNavigate, useParams } from 'react-router';
import { getNumberOfOrderTypes } from '../../api/OrderAPI';
import { RefreshToken } from '../../configs/config';

function ListOrder(){
    const navigate = useNavigate();
    const { type } = useParams();
    const [counts, setCounts] = useState([0, 0, 0, 0, 0])

    useEffect(() => {

        async function fetchData() {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 
        
            const token = localStorage.getItem('accessToken');
            
            const res = await getNumberOfOrderTypes(token);
        
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else {
                // set number of orders of each types
                let all = 0;
                Object.entries(res.data).forEach(([key, value]) => {
                    all += value;
                });
                setCounts([all, res.data.pending, res.data.processing, res.data.completed, res.data.canceled]);
            }
        }
      
        fetchData();
    }, [])

    function selectTypeOfOrders(type){
        navigate('/profile/orders/'+type);
    }

    return(
        <div className='profile-page'>
            <div className='profile-left-side'>
                <CategorySide index='4'/>
            </div>

            <div className='profile-right-side'>
                <div className='profile-right-side-label'>
                    <span>NHỮNG ĐƠN HÀNG GẦN ĐÂY</span>
                </div>
                <div className='type-order-container'>
                    <div 
                        className={'type-order-wrap'+(type === 'all' ? ' active' : '')} 
                        onClick={()=>selectTypeOfOrders('all')}
                    >
                        <div className='type-order-number'>{counts[0]}</div>
                        <div className='type-order-label'>Tất cả</div>
                    </div>
                    <div 
                        className={'type-order-wrap'+(type === 'pending' ? ' active' : '')} 
                        onClick={()=>selectTypeOfOrders('pending')}
                    >
                        <div className='type-order-number'>{counts[1]}</div>
                        <div className='type-order-label'>Chờ xác nhận</div>
                    </div>
                    <div 
                        className={'type-order-wrap'+(type === 'processing' ? ' active' : '')} 
                        onClick={()=>selectTypeOfOrders('processing')}
                    >
                        <div className='type-order-number'>{counts[2]}</div>
                        <div className='type-order-label'>Đang xử lý</div>
                    </div>
                    <div 
                        className={'type-order-wrap'+(type === 'completed' ? ' active' : '')} 
                        onClick={()=>selectTypeOfOrders('completed')}
                    >
                        <div className='type-order-number'>{counts[3]}</div>
                        <div className='type-order-label'>Hoàn tất</div>
                    </div>
                    <div 
                        className={'type-order-wrap'+(type === 'canceled' ? ' active' : '')} 
                        onClick={()=>selectTypeOfOrders('canceled')}
                    >
                        <div className='type-order-number'>{counts[4]}</div>
                        <div className='type-order-label'>Bị hủy</div>
                    </div>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='list-order-content'>
                    <OrderList type={type}/>
                </div>
                
            </div>
        </div>
    );
}

export default ListOrder;