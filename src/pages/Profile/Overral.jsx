import './overral.css'
import './profile.css'
import { getProvinceName, getDistrictName, getWardName } from '../../configs/VietnameseAddresses';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySide from '../../components/Profile/CategorySide';
import OrderList from '../../components/Order/OrderList';
import { RefreshToken } from '../../configs/config';
import { getAccountInfo } from '../../api/UserAPI';
import { OrderStatus } from '../../configs/global';

function Overral(){
    const navigate = useNavigate();
    const [name, setName] = useState('[Chưa có]');
    const [email, setEmail] = useState('[Chưa có]');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addr, setAddr] = useState([]);

    useEffect(()=>{
        async function fetchProfileData() {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await getAccountInfo(token);
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else {
                const acc = res.data;
                if(acc.firstname || acc.lastname)
                    setName(acc.lastname + ' ' + acc.firstname)
                if(acc.email) 
                    setEmail(acc.email)
                if(acc.phoneNumber)
                    setPhoneNumber(acc.phoneNumber);
                // match address by address code
                if(acc.address.length != 0){
                    acc.address[4] = getWardName(acc.address[2], acc.address[3], acc.address[4]);
                    acc.address[3] = getDistrictName(acc.address[2], acc.address[3]);
                    acc.address[2] = getProvinceName(acc.address[2]);
                    setAddr(acc.address);
                }
                
            }
        }

        fetchProfileData();
          
    }, []);

    function goTo(e) {
        navigate(e);
        window.scrollTo(0, 0);
    }

    return(
        <div className='profile-page'>
            <div className='profile-left-side'>
                <CategorySide index='1'/>
            </div>

            <div className='profile-right-side'>
                <div className='profile-right-side-label'>
                    <span>THÔNG TIN TÀI KHOẢN</span>
                    <span className='overral-page-side-label'
                        onClick={()=>goTo('/profile/account-info')}
                    >
                        Cập nhật tài khoản</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='profile-info-content'>
                    <p className='p'>Họ và tên: <span>{name}</span></p>
                    <p className='p'>Email: <span>{email}</span></p>
                    <p className='p'>Số điện thoại: <span>{phoneNumber}</span></p>
                </div>
                <div className='profile-right-side-label recent-orders'>
                    <span>NHỮNG ĐƠN HÀNG GẦN ĐÂY</span>
                    <span className='overral-page-side-label'
                        onClick={()=>goTo('/profile/orders/all')}
                    >   
                        Xem tất cả</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='recent-orders-content'>
                    <OrderList type={OrderStatus.ALL} limit={4}/>
                </div>
                <div className='profile-right-side-label my-address'>
                    <span>SỔ ĐỊA CHỈ</span>
                    <span className='overral-page-side-label'
                        onClick={()=>goTo('/profile/address/edit')}
                    >
                        Cập nhật địa chỉ</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='my-address-info-content'>
                    <p className='p ma-title'>ĐỊA CHỈ GIAO HÀNG MẶC ĐỊNH</p>
                    <p className={'p' + (addr.length == 0 ? '' : ' ma-hidden')}><i>Chưa có</i></p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[0]}</p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[5]}</p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[4] + ', ' + addr[3] + ', ' + addr[2]}</p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>Tel: {addr[1]}</p>
                </div>
            </div>
        </div>
    );
}

export default Overral;