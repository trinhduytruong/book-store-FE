import './checkout.css';
import { CheckValidate, RefreshToken} from '../../configs/config';
import AddressForm from '../../components/Form/AddressForm';
import {CaretLeftFilled} from '@ant-design/icons'
import CheckoutTitleItem from '../../components/Title/CheckoutTitleItem';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getAccountInfo } from '../../api/UserAPI';
import { getCheckedCartItems } from '../../api/CartAPI';
import { createOrder } from '../../api/OrderAPI';
import OrderConfirmPopup from '../../components/Popup/OrderConfirm';

function Checkout() {
  const navigate = useNavigate();
  const shippingCost = 20000;
  const [addr, setAddr] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [checkedTitles, setCheckedTitles] = useState(['']);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notes, setNotes] = useState('')
  const [confirmState, setConfirmState] = useState(false);


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

      async function fetchTitlesData() {
        const validRefToken = await RefreshToken();
        if(!validRefToken){
          navigate('/login');
          return;
        } 
    
        const token = localStorage.getItem('accessToken');
        
        const res = await getCheckedCartItems(token);
    
        if (!res.ok)
            alert('Gửi yêu cầu thất bại, hãy thử lại!')
        else setCheckedTitles(res.data);
    
      }
  
      fetchData();
      fetchTitlesData();
        
  }, []);

  useEffect(()=>{
    if(checkedTitles.length == 0) navigate('/cart');
    else if(checkedTitles[0] != ''){
      let tPrice = 0;
      checkedTitles.map((item) => {
        return tPrice += (item.title?.price * item.count)
      })
      setTotalPrice(tPrice);
    }
  }, [checkedTitles]);

  async function handleSubmit(){
    const validated = CheckValidate(document, 'recipient-name', 'email', 'phone-number', 
      'province-select', 'district-select', 'ward-select', 'detail-address')
    
    if(validated){
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

      const order = {
        recipientInfo: address, email, totalPrice, shippingCost, finalPrice: totalPrice + shippingCost, notes, checkedItems: checkedTitles
      }

      const token = localStorage.getItem('accessToken');
      
      const res = await createOrder(token, order);

      if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
      else {
        alert('Tạo đơn hàng thành công!')
        navigate('/profile/orders/pending');
        window.scrollTo(0, 0);
      }
    }
    else window.scrollTo(0, 0)
  }

  function handlePayment(result){
    setConfirmState(false);
    if(result){
      handleSubmit()
    }
  }


  return (
    <div className='checkout-page'>
      <OrderConfirmPopup state={confirmState} result={handlePayment}/>
      <div className='checkout-block address'>
        <div className='block-title'>
          <span className='block-address-title-name'>ĐỊA CHỈ GIAO HÀNG</span>
        </div>
        <div className='checkout-separate-line'></div>
        <div className='block-content address'>
          <AddressForm addr={addr} email={email} />
        </div>
      </div>
      <div className='checkout-block shipping'>
        <div className='block-title'>
          <span className='block-shipping-title-name'>PHƯƠNG THỨC VẬN CHUYỂN</span>
        </div>
        <div className='checkout-separate-line'></div>
        <div className='block-content'>
          <div className='block-content-wrap'>
            <input className="checking-input" type="radio" id="shipping" value="shipping" checked readOnly/>
            <label htmlFor="shipping">
              Giao hàng tiêu chuẩn: <span className='shipping-cost'> {new Intl.NumberFormat("de-DE").format(shippingCost)}đ</span>
            </label>
          </div>
        </div>
      </div>
      <div className='checkout-block payment'>
        <div className='block-title'>
          <span className='block-payment-title-name'>PHƯƠNG THỨC THANH TOÁN</span>
        </div>
        <div className='checkout-separate-line'></div>
        <div className='block-content'>
          <div className='block-content-wrap'>
            <input className="checking-input" type="radio" id="payment" value="payment" checked readOnly/>
            <label htmlFor="payment">Thanh toán bằng tiền mặt khi nhận hàng</label>
          </div>
        </div>
      </div>
      <div className='checkout-block coupon' hidden>
        <div className='block-title'>
          <span className='block-coupon-title-name'>MÃ KHUYẾN MÃI</span>
        </div>
        <div className='checkout-separate-line'></div>
        <div className='block-content'>
          <span>Temple</span>
        </div>
      </div>
      <div className='checkout-block notes'>
        <div className='block-title'>
          <span className='block-notes-title-name'>GHI CHÚ</span>
        </div>
        <div className='checkout-separate-line'></div>
        <div className='block-content'>
          <div className='form-item-wrap'>
            <label className='form-item-label' htmlFor='recipient-name'>Lưu ý cho cửa hàng</label>
            <input
                id='notes'
                type='text'
                className='form-item-input'
                placeholder='Thêm ghi chú (Tùy chọn)'
                style={{fontWeight: '400'}}
                value={notes}
                onChange={(e)=>setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='checkout-block order'>
        <div className='block-title'>
          <span className='block-order-title-name'>KIỂM TRA LẠI ĐƠN HÀNG</span>
        </div>
        <div className='checkout-separate-line'></div>
        <div className='block-content'>
        {
          checkedTitles?.map((item, i)=>{
              return(
                <div key={i}>
                  <CheckoutTitleItem item={item} />
                  {i+1 === checkedTitles.length? <></> : <div className='checkout-separate-line item'></div>}
                </div>
                  
              )
          })
        }
        </div>
      </div>

      <div className='end-checkout'>
        <div className='end-checkout-info'>
          <div className='end-checkout-total-price'>
            <div>Thành tiền</div>
            <div className='price'>
              {new Intl.NumberFormat("de-DE").format(totalPrice)} đ
            </div>
          </div>
          <div className='end-checkout-shipping-price'>
            <div>Phí vận chuyển</div>
            <div className='price'>
              {new Intl.NumberFormat("de-DE").format(shippingCost)} đ
            </div>
          </div>
          <div className='end-checkout-final-price'>
            <div id='final-price-title'>Tổng số tiền</div>
            <div id='final-price-number' className='price'>
              {new Intl.NumberFormat("de-DE").format(totalPrice + shippingCost)} đ
            </div>
          </div>

        </div>
        <div className='checkout-separate-line end'></div>
        <div className='end-checkout-handle'>
          <div className='end-checkout-gobackcart' onClick={() => navigate('/cart')}>
            <CaretLeftFilled className='end-checkout-gbc-icon'/>
            <span className='cart-checkout-gbc-title'>Quay về giỏ hàng</span>
          </div>

          <div  className='end-checkout-submit' onClick={() => setConfirmState(true)}>
            <span>Xác nhận thanh toán</span>
          </div> 
        </div>
      
      </div>

    
    </div>
    
  )
}

export default Checkout