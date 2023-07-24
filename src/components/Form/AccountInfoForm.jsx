import './form.css'
import { useEffect, useState } from 'react';
import { Gender } from '../../configs/global';
import PhoneNumberUpdatePopup from '../Popup/PhoneNumberUpdate';
import { RefreshToken } from '../../configs/config';
import { useNavigate } from 'react-router';
import { updateAccountInfo } from '../../api/UserAPI';
import EmailUpdatePopup from '../Popup/EmailUpdate';

function AccountInfoForm(props){
    const navigate = useNavigate();
    const [pNumberState, setPNumberState] = useState(false);
    const [emailState, setEmailState] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        document.getElementById('last-name').value = props.user.lastname ?? '';
        document.getElementById('first-name').value = props.user.firstname ?? '';
        document.getElementById('gender-' + (props.user.gender ?? Gender.OTHER)).checked = true;
        setPhoneNumber(props.user.phoneNumber);
        setEmail(props.user.email ?? '');
    }, [props.user])
    
    async function handlePhoneNumberResult(result){
        setPNumberState(false);
        if(result){
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await updateAccountInfo(token, {phoneNumber: result});
    
            if(res.status == 409)
                alert('Số điện thoại đã tồn tại, hãy thử lại!')
            else if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else{
                alert('Cập nhật thông tin thành công!')
                setPhoneNumber(result);
            }
        }
    }

    async function handleEmailResult(result){
        setEmailState(false);
        if(result){
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await updateAccountInfo(token, {email: result});
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else{
                alert('Cập nhật thông tin thành công!')
                setEmail(result);
            }
        }
    }

    return(
        <div className='account-info-form'>
            <PhoneNumberUpdatePopup state={pNumberState} result={handlePhoneNumberResult}/>
            <EmailUpdatePopup state={emailState} result={handleEmailResult}/>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='recipient-name'>Họ*</label>
                <input
                    id='last-name'
                    type='text'
                    className='form-item-input'
                    placeholder='Nhập họ'
                />
            </div>
            <span id='warning-last-name' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='recipient-name'>Tên*</label>
                <input
                    id='first-name'
                    type='text'
                    className='form-item-input'
                    placeholder='Nhập tên'
                />
            </div>
            <span id='warning-first-name' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='phone-number'>Giới tính</label>
                <form className='form-item-radio-form' id='gender'>
                    <input
                        id={'gender-'+Gender.MALE}
                        type='radio'
                        name='gender'
                        className='form-item-input-radio'
                    />
                    <label htmlFor={'gender-'+Gender.MALE} className='form-item-input-label'>Nam</label>
                    <input
                        id={'gender-'+Gender.FEMALE}
                        type='radio'
                        name='gender'
                        className='form-item-input-radio'
                    />
                    <label htmlFor={'gender-'+Gender.FEMALE} className='form-item-input-label'>Nữ</label>
                    <input
                        id={'gender-'+Gender.OTHER}
                        type='radio'
                        name='gender'
                        className='form-item-input-radio'
                    />
                    <label htmlFor={'gender-'+Gender.OTHER} className='form-item-input-label'>Khác</label>
                </form>
            </div>
            <span id='warning' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='email'>Email*</label>
                <input
                    id='email'
                    type='email'
                    className='form-item-input form-item-special'
                    placeholder='Thêm email'
                    value={email}
                    readOnly
                    disabled
                />
                <span className='form-item-special-change' onClick={() => setEmailState(true)}>Thay đổi</span>
            </div>
            <span id='warning-email' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='phone-number'>Số điện thoại*</label>
                <input
                    id='phone-number'
                    type='number'
                    className='form-item-input form-item-special'
                    placeholder='Nhập số điện thoại'
                    value={phoneNumber}
                    readOnly
                    disabled
                />
                <span className='form-item-special-change' onClick={() => setPNumberState(true)}>Thay đổi</span>
            </div>
            <span id='warning-phone-number' className='warning hidden' >Thông tin này không thể để trống</span>
            {/* <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='birthday'>Ngày sinh</label>
                <input
                    id='birthday'
                    type='date'
                    className='form-item-input date-picker'
                />
            </div>
            <span id='warning' className='warning hidden' >Thông tin này không thể để trống</span> */}
            <div className='form-item-wrap'>
                <label className='form-item-label'></label>
                <a className='form-item-change-pwd-handler'
                    style={{cursor: 'pointer', color: '#2F80ED', marginLeft: '10px'}}
                >Đổi mật khẩu</a>
            </div>
            <span id='warning' className='warning hidden' ></span>
        </div>
    );
}

export default AccountInfoForm;