import './categorySide.css';
import { useNavigate } from 'react-router-dom';

function CategorySide(props) {
    const navigate = useNavigate();
    const i = props?.index ? props.index : '';

    function goTo(e) {
        navigate(e);
        window.scrollTo(0, 0);
    }
    return (
        <div className='side-wrap'>
            <div className='profile-category-label'>
                <span>TÀI KHOẢN</span>    
            </div>   
            <div className='titledetail-separate-line'></div> 
            <div className={'profile-category-item' + (i == 1 ? ' active' : '')} 
                onClick={()=>goTo('/profile/overral')}
            >
                <span>Thông tin chung</span>
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className={'profile-category-item' + (i == 2 ? ' active' : '')}
                onClick={()=>goTo('/profile/account-info')}
            >
                <span>Cập nhật tài khoản</span>
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className={'profile-category-item' + (i == 3 ? ' active' : '')}
                onClick={()=>goTo('/profile/address')}
            >
                <span>Sổ địa chỉ</span>
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className={'profile-category-item' + (i == 4 ? ' active' : '')}
                onClick={()=>goTo('/profile/orders/all')}
            >
                <span>Đơn hàng của tôi</span>
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className='profile-category-item'>
                <span>Voucher của tôi</span>
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className='profile-category-item'>
                <span>Thông báo</span>
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className='profile-category-item'>
                <span>Đăng ký nhận tin điện tử</span>
            </div>
            <div className='titledetail-separate-line'></div> 
        </div>
    
  )
}

export default CategorySide