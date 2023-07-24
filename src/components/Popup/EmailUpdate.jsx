import './popup.css'
import './updatePopup.css'
import PopupWrapper from './PopupWrapper';
import { useState, useEffect } from 'react';
import { CheckValidate } from '../../configs/config';

function EmailUpdatePopup(props) {
    const [state, setState] = useState(false)
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [otp, setOtp] = useState('');

    useEffect(() => {
        setState(props.state)
    }, [props.state])

    function handleSelecting(e) {
        props.result(e);
        document.getElementById('warning-new-email').classList.add('hidden')
        document.getElementById('warning-otp-code-1').classList.add('hidden')
    }

    function handleSentOTP(){
        const validated = CheckValidate(document, 'new-email');
        if(validated){
            setNewEmail(email);
            document.getElementById('warning-new-email').classList.add('hidden')
            document.getElementById('warning-otp-code-1').classList.add('hidden')
            alert('Đã gửi OTP tới email!')
        }
    }

    function handleSubmit(){
        
        const validated = CheckValidate(document, 'new-email', 'otp-code-1');

        if(validated){
            const otp = document.getElementById('otp-code-1').value;
            const warning = document.getElementById('warning-otp-code-1');
            
            if (otp != 1) {
                warning.classList.remove('hidden');
                return;
            }
            else {
                handleSelecting(newEmail);
                setNewEmail('')
                setEmail('');
                setOtp('');
            }
        }
    }
    return(
        <div className={`update-popup ${state?'':'hidden'}`}>
            <div className='popup-box'>
                <div className='popup-box-title'>CẬP NHẬT EMAIL</div>
                <div className='popup-item-wrap'> 
                    <input
                        id='new-email'
                        type='text'
                        className='popup-item-input popup-item-special'
                        placeholder='Nhập email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className='popup-item-special-otp' onClick={handleSentOTP}>
                        Gửi OTP
                    </span>
                </div>
                <span id='warning-new-email' className='warning hidden' 
                >
                    Thông tin này không thể để trống
                </span>
                <div className='popup-item-wrap'>
                    <input
                        id='otp-code-1'
                        type='text'
                        className='popup-item-input'
                        placeholder='Nhập mã OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <span id='warning-otp-code-1' className='warning hidden' 
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

export default EmailUpdatePopup;