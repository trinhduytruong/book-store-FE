import './popup.css'
import PopupWrapper from './PopupWrapper';
import { useState, useEffect } from 'react';

function DeleteAddressPopup(props) {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(props.state)
    }, [props.state])

    function handleSelecting(e) {
        props.result(e);
    }
    return(
        <div className={`delete-address-popup ${state?'':'hidden'}`}>
            <div className='popup-box'
                style={{ height: 'fit-content',
                        width: '300px',
                        marginLeft: '-150px'}}
            >
                <div className='popup-box-title'>XÓA ĐỊA CHỈ MẶC ĐỊNH</div>
                <div style={{padding: '16px 0'}}>Bạn vẫn chắc chắn muốn xóa?</div>
                <div className='popup-box-handle'>
                    <div className='popup-box-cancel' onClick={() => handleSelecting(false)}>Hủy</div>
                    <div className='popup-box-ok' onClick={() => handleSelecting(true)}>Xóa</div>
                </div>
            </div>
            <PopupWrapper/>
        </div>
    )
}

export default DeleteAddressPopup;