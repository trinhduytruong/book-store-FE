import './form.css'
import { getProvinces, getDistricts, getWards } from '../../configs/VietnameseAddresses';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddressForm(props){
    const navigate = useNavigate();

    const [recipientName, setRepicipentName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [detailAddr, setDetailAddr] = useState('');
    const [provinces, setProvinces] = useState(null);
    const [p, setP] = useState('select-placeholder');
    const [districts, setDistricts] = useState(null);
    const [d, setD] = useState('select-placeholder');
    const [wards, setWards] = useState(null);
    const [w, setW] = useState('select-placeholder');

    useEffect(()=>{
        setRepicipentName(props.addr[0]??'');
        setEmail(props.email??'');
        setPhoneNumber(props.addr[1]??'');
        setDetailAddr(props.addr[5]??'');

        const Ps = getProvinces();
        setProvinces(Ps)

        if(props.addr.length != 0 && props.addr[2]){
            setP(props.addr[2])
            setD(props.addr[3])
            setW(props.addr[4])
            setDistricts(getDistricts(props.addr[2]))
            setWards(getWards(props.addr[2], props.addr[3]))
        }
        else console.log('Non-addr: ',props.addr)

    }, [props.addr])
    
    function onProviceChange(e){
        const Ds = getDistricts(e.target.value);
        setP(e.target.value)
        setD('select-placeholder')
        setW('select-placeholder')
        setWards(null)
        setDistricts(Ds)
    }

    function onDistrictChange(e){
        const Ws = getWards(p, e.target.value);
        setD(e.target.value)
        setW('select-placeholder')
        setWards(Ws)
    }

    function onWardChange(e){
        setW(e.target.value)
    }

    function goToEditAccount(){
        navigate('/profile/account-info')
        window.scrollTo(0, 0);
    }


    return(
        <div className='address-form'>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='recipient-name'>Họ và tên người nhận</label>
                <input
                    id='recipient-name'
                    type='text'
                    className='form-item-input'
                    placeholder='Nhập họ và tên người nhận'
                    value={recipientName}
                    onChange={(e)=>setRepicipentName(e.target.value)}
                />
            </div>
            <span id='warning-recipient-name' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='email'>Email</label>
                <input
                    id='email'
                    type='email'
                    className='form-item-input form-item-special'
                    placeholder='Thêm email'
                    disabled
                    value={email}
                />
                <span className='form-item-special-change' onClick={goToEditAccount}>Cập nhật</span>
            </div>
            <span id='warning-email' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='phone-number'>Số điện thoại</label>
                <input
                    id='phone-number'
                    type='number'
                    className='form-item-input'
                    placeholder='Nhập số điện thoại'
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                />
            </div>
            <span id='warning-phone-number' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label'>Tỉnh/Thành phố</label>
                <select id="province-select" className='form-item-select' 
                    onChange={onProviceChange} value={p}
                >
                    <option value="select-placeholder" disabled hidden>Chọn Tỉnh/Thành phố</option>
                    {
                        provinces?.map((e, i) => {
                            return <option key={i} value={e.code}>{e.name}</option>
                        })
                    }
                </select>
            </div>
            <span id='warning-province-select' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label'>Quận/Huyện</label>
                <select id="district-select" className='form-item-select' 
                        disabled={districts ? false : true} value={d}
                        onChange={onDistrictChange}   
                >
                    <option value="select-placeholder" disabled hidden className='selecting-placeholder'>Chọn Quận/Huyện</option>
                    {
                        districts?.map((e, i) => {
                            return <option key={i} value={e.code}>{e.name}</option>
                        })
                    }
                </select>
            </div>
            <span id='warning-district-select' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label'>Phường/Xã</label>
                <select id="ward-select" className='form-item-select' 
                        disabled={wards ? false : true} value={w}
                        onChange={onWardChange}
                >
                    <option value="select-placeholder" disabled hidden >Chọn Phường/Xã</option>
                    {
                        wards?.map((e, i) => {
                            return <option key={i} value={e.code}>{e.name}</option>
                        })
                    }
                </select>
            </div>
            <span id='warning-ward-select' className='warning hidden' >Thông tin này không thể để trống</span>
            <div className='form-item-wrap'>
                <label className='form-item-label' htmlFor='detail-address'>Địa chỉ nhận hàng</label>
                <input
                    id='detail-address'
                    type='text'
                    className='form-item-input'
                    placeholder='Nhập địa chỉ chi tiết'
                    value={detailAddr}
                    onChange={(e)=>setDetailAddr(e.target.value)}
                />
            </div>
            <span id='warning-detail-address' className='warning hidden' >Thông tin này không thể để trống</span>
        </div>
    );
}

export default AddressForm;