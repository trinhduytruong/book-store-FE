import './popup.css'
import PopupWrapper from './PopupWrapper';
import { useState, useEffect } from 'react';

function OrderConfirmPopup(props) {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(props.state)
    }, [props.state])

    function handleSelecting(e) {
        props.result(e);
    }
    return(
        <div className={`order-confirm-popup ${state?'':'hidden'}`}>
            <div className='popup-box'
                style={{ height: 'fit-content',
                        width: '300px',
                        marginLeft: '-150px'}}
            >
                <div className='popup-box-title'>XÁC NHẬN THANH TOÁN</div>
                <div style={{padding: '16px 0'}}>Bạn có chắc chắn muốn thanh toán?</div>
                <div className='popup-box-handle'>
                    <div className='popup-box-cancel' onClick={() => handleSelecting(false)}>Trở lại</div>
                    <div className='popup-box-ok' onClick={() => handleSelecting(true)}>Xác nhận</div>
                </div>
            </div>
            <PopupWrapper/>
        </div>
    )
}

export default OrderConfirmPopup;