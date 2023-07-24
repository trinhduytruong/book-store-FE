import './addressEdit.css'
import './profile.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySide from '../../components/Profile/CategorySide';
import AddressForm from '../../components/Form/AddressForm';
import {DoubleLeftOutlined} from '@ant-design/icons'
import { CheckValidate, RefreshToken } from '../../configs/config';
import { getAccountInfo, updateAccountInfo } from '../../api/UserAPI';
import DeleteAddressPopup from '../../components/Popup/DeleteAddress';

function AddressEdit(){
    const navigate = useNavigate();
    const [addr, setAddr] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const [deletingState, setDeletingState] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await getAccountInfo(token, ['address', 'email']);
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else {
                setAddr(res.data.address);
                setEmail(res.data.email);
            }
        }

        fetchData();
          
    }, []);

    async function handleUpdate (){
        const validated = CheckValidate(document, 'recipient-name', 'phone-number', 
        'province-select', 'district-select', 'ward-select', 'detail-address')

        if (validated) {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const recipientName = document.getElementById('recipient-name').value;
            const phoneNumber = document.getElementById('phone-number').value;
            const provinceIndex = document.getElementById('province-select').value;
            const districtIndex = document.getElementById('district-select').value;
            const wardIndex = document.getElementById('ward-select').value;
            const detailAddr = document.getElementById('detail-address').value;

            const address = [recipientName, phoneNumber, provinceIndex, districtIndex, wardIndex, detailAddr];

            const token = localStorage.getItem('accessToken');
            
            const res = await updateAccountInfo(token, {address});
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else{
                alert('Cập nhật địa chỉ thành công!')
                navigate('/profile/address')
                window.scrollTo(0, 0);
            }
        }
    }

    async function handleDeletingResult(result){
        setDeletingState(false);
        if(result){
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await updateAccountInfo(token, {address: []});
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else{
                alert('Cập nhật địa chỉ thành công!')
                navigate('/profile/address')
                window.scrollTo(0, 0);
            }
        }
    }

    return(
        <div className='profile-page'>
            <DeleteAddressPopup state={deletingState} result={handleDeletingResult}/>
            <div className='profile-left-side'>
                <CategorySide index='3'/>
            </div>

            <div className='profile-right-side'>
                <div className='profile-right-side-label'>
                    <span>CẬP NHẬT ĐỊA CHỈ GIAO HÀNG</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='address-edit-content'>
                    <AddressForm addr={addr} email={email}/>
                    <div className='address-edit-handle'>
                        <button className='profile-update-button' onClick={handleUpdate}>Cập nhật địa chỉ</button>
                        <a className='form-item-delete-addr'
                            style={{cursor: 'pointer', color: '#2F80ED', marginLeft: '20px'}}
                            onClick={() => setDeletingState(true)}
                        >Xóa địa chỉ mặc định</a>
                        <span className='address-edit-go-back'><DoubleLeftOutlined className='address-edit-go-back-icon'/>Quay lại</span>
                    </div>
                   
                </div>
                
            </div>
        </div>
    );
}

export default AddressEdit;