import './cart.css';
import { useNavigate } from 'react-router-dom';
import CartTitleItem from '../../components/Title/CartTitleItem';
import {GiftOutlined, CaretRightFilled} from '@ant-design/icons'
import { useEffect } from 'react';
import { checkAllCartItems, getAllCartItems } from '../../api/CartAPI';
import { useState } from 'react';
import { RefreshToken } from '../../configs/config';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalChecked, setTotalChecked] = useState(0);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  
  async function fetchData() {
    const validRefToken = await RefreshToken();
    if(!validRefToken){
      navigate('/login');
      return;
    } 

    const token = localStorage.getItem('accessToken');
    
    const res = await getAllCartItems(token);

    if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
    else setCartItems(res.data);

  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => { // traverse all cart-items
    let totalAmount = 0;
    let totalChecked = 0;

    cartItems?.map((item) => {
      if(item.isChecked){
        totalChecked++;
        totalAmount += (item.title.price * item.count);
      }
    })

    if(totalChecked == cartItems?.length && cartItems?.length != 0)
      setIsCheckedAll(true)
    else setIsCheckedAll(false)

    console.log(totalAmount, totalChecked)
    setTotalAmount(totalAmount);
    setTotalChecked(totalChecked);

  }, [cartItems]);


  async function handleCheckAll(e) {

    const c = e.target.checked
    if(cartItems?.length != 0){
      const validRefToken = await RefreshToken();
      if(!validRefToken){
        navigate('/login');
        return;
      } 

      const token = localStorage.getItem('accessToken');
      const res = await checkAllCartItems(token, c);

      if (!res.ok)
          alert('Gửi yêu cầu thất bại, hãy thử lại!')
      else {
        fetchData();
        setIsCheckedAll(c);
      }
    }

  }

  function goToCheckout(){
    if(totalChecked != 0)
      navigate('/checkout')
  }

  function handleRerender(){
    fetchData()
  }

  return (
    <div className='cart-page'>
      <div className='cart-page-title'>
        <span>GIỎ HÀNG</span>
      </div>
      <div className='cart-main'>
        <div className="cart-wrap">
          <div className='cart-item-header'>
            <div className='cart-item-header-checked'>
              <input type='checkbox' checked={isCheckedAll} onChange={handleCheckAll}/>
            </div>
            <div className='cart-item-header-info'>
              <span>Chọn tất cả ({cartItems?.length} sản phẩm)</span>
            </div>
            <div className='cart-item-header-unitprice'>
              <span>Đơn giá</span>
            </div>
            <div className='cart-item-header-count'>
              <span>Số lượng</span>
            </div>
            <div className='cart-item-header-total'>
              <span>Số tiền</span>
            </div>
            <div className='cart-item-header-remove'>
            </div>
          </div>

          <div className='cart-items'>
            <div style={{display:(cartItems?.length == 0 ? 'flex' : 'none'),
                padding: '8px', color: '#7a7e7f', justifyContent:'center'}}
            >
              Chưa có sản phẩm nào.<a href='/' style={{marginLeft: '8px'}}>Mua ngay</a>
            </div>
            { 
              cartItems?.map((item, i)=>{
                return(
                  <div key={i}>
                    <CartTitleItem item={item} rerender={handleRerender}/>
                    {i+1 === cartItems.length? <></> : <div className='cart-separate-line'></div>}
                  </div>
                )
              })
            }
          </div>
          
        </div>

        <div className='cart-promotion'>
          <div className='cart-promotion-title'>
            <GiftOutlined className='cart-promotion-title-icon'/>
            <span className='cart-promotion-title-name'>KHUYẾN MÃI</span>
          </div>
          <div className='cart-separate-line'></div>
          <div className='cart-promotion-content'>
            <div className='temple-promotion'>Khuyến mãi giảm sốc 1 triệu đồng cho đơn hàng trên 1 tỷ đồng</div>
            <div className='titledetail-separate-line'></div>
            <div className='temple-promotion'>Miễn phí giao hàng cho đơn hàng trên 100 triệu đồng</div>
          </div>
        </div>
      </div>
      
      <div className='cart-checkout'>
        <div className='cart-checkout-info'>
          <span className='cart-checkout-title'>Tổng cộng:</span>
          <span className='cart-checkout-total'>{new Intl.NumberFormat("de-DE").format(totalAmount)}đ</span>
        </div>

        <div className='cart-checkout-forward' onClick={goToCheckout}
              style={{backgroundColor: (totalChecked == 0 ? '#e0e0e0' : '#c93333'), 
                cursor: (totalChecked == 0 ? 'not-allowed' : 'pointer')}}
              
        >
          <span className='cart-checkout-fw-title'>Thanh toán</span>
          <CaretRightFilled className='cart-checkout-fw-icon'/>
        </div>
      
      </div>
    </div>
    
  )
}

export default Cart