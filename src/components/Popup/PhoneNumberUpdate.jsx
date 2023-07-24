import './popup.css'
import './updatePopup.css'
import PopupWrapper from './PopupWrapper';
import { useState, useEffect } from 'react';
import { CheckValidate } from '../../configs/config';

function PhoneNumberUpdatePopup(props) {
    const [state, setState] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    useEffect(() => {
        setState(props.state)
    }, [props.state])

    function handleSelecting(e) {
        props.result(e);
        document.getElementById('warning-new-phone-number').classList.add('hidden')
        document.getElementById('warning-otp-code').classList.add('hidden')
    }

    function handleSentOTP(){
        const validated = CheckValidate(document, 'new-phone-number');
        if(validated){
            setNewPhoneNumber(phoneNumber);
            document.getElementById('warning-new-phone-number').classList.add('hidden')
            document.getElementById('warning-otp-code').classList.add('hidden')
            alert('Đã gửi OTP tới số điện thoại!')
        }
    }

    function handleSubmit(){
        const validated = CheckValidate(document, 'new-phone-number', 'otp-code');
        if(validated){
            const otp = document.getElementById('otp-code').value;
            const warning = document.getElementById('warning-otp-code');
            
            if (otp != 1) {
                warning.classList.remove('hidden');
                return;
            }
            else {
                handleSelecting(newPhoneNumber);
                setNewPhoneNumber('')
                setPhoneNumber('');
                setOtp('');
            }
        }
    }
    return(
        <div className={`update-popup ${state?'':'hidden'}`}>
            <div className='popup-box'>
                <div className='popup-box-title'>CẬP NHẬT SỐ ĐIỆN THOẠI</div>
                <div className='popup-item-wrap'> 
                    <input
                        id='new-phone-number'
                        type='number'
                        className='popup-item-input popup-item-special'
                        placeholder='Nhập số điện thoại'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <span className='popup-item-special-otp' onClick={handleSentOTP}>
                        Gửi OTP
                    </span>
                </div>
                <span id='warning-new-phone-number' className='warning hidden' 
                >
                    Thông tin này không thể để trống
                </span>
                <div className='popup-item-wrap'>
                    <input
                        id='otp-code'
                        type='text'
                        className='popup-item-input'
                        placeholder='Nhập mã OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <span id='warning-otp-code' className='warning hidden' 
                >
                    Mã OTP không hợp lệ
                </span>
                <div className='popup-box-handle'>
                    <div className='popup-box-cancel' onClick={() => handleSelecting(false)}>Trở lại</div>
                    <div className='popup-box-ok' onClick={handleSubmit}>Xác nhận</div>
                </div>
            </div>
            <PopupWrapper/>
        </div>
    )
}

export default PhoneNumberUpdatePopup;