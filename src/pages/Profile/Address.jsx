import './address.css'
import './profile.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySide from '../../components/Profile/CategorySide';
import { getAccountInfo } from '../../api/UserAPI';
import { RefreshToken } from '../../configs/config';
import { getProvinceName, getDistrictName, getWardName } from '../../configs/VietnameseAddresses';

function Address(){
    const navigate = useNavigate();
    const [addr, setAddr] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await getAccountInfo(token, ['address']);
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else {
                const tmpAddr = res.data.address;
                if(tmpAddr.length != 0){
                    tmpAddr[4] = getWardName(tmpAddr[2], tmpAddr[3], tmpAddr[4]);
                    tmpAddr[3] = getDistrictName(tmpAddr[2], tmpAddr[3]);
                    tmpAddr[2] = getProvinceName(tmpAddr[2]);
                    setAddr(tmpAddr);
                }
            }
        }

        fetchData();
          
    }, []);

    function goToEditAddress(){
        navigate('/profile/address/edit');
        window.scrollTo(0, 0);
    }

    return(
        <div className='profile-page'>
            <div className='profile-left-side'>
                <CategorySide index='3'/>
            </div>

            <div className='profile-right-side'>
                <div className='profile-right-side-label'>
                    <span>SỔ ĐỊA CHỈ</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='my-address-info-content'>
                    <p className='p ma-title'>ĐỊA CHỈ GIAO HÀNG MẶC ĐỊNH</p>
                    <p className={'p' + (addr.length == 0 ? '' : ' ma-hidden')}><i>Chưa có</i></p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[0]}</p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[5]}</p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[4] + ', ' + addr[3] + ', ' + addr[2]}</p>
                    <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>Tel: {addr[1]}</p>
                    <span className='my-address-update-address'
                        onClick={goToEditAddress}
                    >
                        Cập nhật địa chỉ mặc định</span>
                </div>
                
            </div>
        </div>
    );
}

export default Address;