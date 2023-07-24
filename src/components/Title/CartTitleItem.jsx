import './cartTitleItem.css'
import {
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined
  } from '@ant-design/icons'
import { useState } from 'react';
import { deleteCartItem, updateCartItem } from '../../api/CartAPI';
import { RefreshToken } from '../../configs/config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CartTitleItem(props) {
  const navigate = useNavigate()
  const [name, price] = [props.item.title.name, props.item.title.price];
  const trimmedName = name?.length > 36 ? name.split(0, 36)+'...' : name;

  const [checked, setChecked] = useState(props.item.isChecked);
  const [count, setCount] = useState(props.item.count);

  useEffect(() => {
    setChecked(props.item.isChecked)
    setCount(props.item.count)
  }, [props.item.isChecked, props.item.count])

  async function handleCheck(e){

    const c = e.target.checked
    const validRefToken = await RefreshToken();
    if(!validRefToken){
      navigate('/login');
      return;
    } 

    const token = localStorage.getItem('accessToken');
    const res = await updateCartItem(token, props.item._id, {isChecked: c});

    if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
    else{
      setChecked(c);
      props.rerender(); // call rerender in the cart page
    }

  }

  async function minusHandle(){
    if(props.item.title.quantity != 0){
      const minus = count - 1;
      if(minus >= 1){
        const validRefToken = await RefreshToken();
        if(!validRefToken){
          navigate('/login');
          return;
        } 

        const token = localStorage.getItem('accessToken');
        const res = await updateCartItem(token, props.item._id, {count: minus});

        if (!res.ok)
            alert('Gửi yêu cầu thất bại, hãy thử lại!')
        else{
          setCount(minus);
          props.rerender(); // call rerender in the cart page
        }
      }
    }
  }

  async function plusHandle(){
    if(props.item.title.quantity != 0){
      const plus = count + 1;
      if(plus <= props.item.title.quantity){
        const validRefToken = await RefreshToken();
        if(!validRefToken){
          navigate('/login');
          return;
        } 

        const token = localStorage.getItem('accessToken');
        const res = await updateCartItem(token, props.item._id, {count: plus});

        if (!res.ok)
            alert('Gửi yêu cầu thất bại, hãy thử lại!')
        else{
          setCount(plus);
          props.rerender(); // call rerender in the cart page
        }
      }
      else alert(`Chỉ chọn tối đa ${count} sản phẩm!`) 
    }
  }

  async function deleteHandle(){
    const validRefToken = await RefreshToken();
    if(!validRefToken){
      navigate('/login');
      return;
    } 

    const token = localStorage.getItem('accessToken');
    const res = await deleteCartItem(token, props.item._id);

    if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
    else props.rerender(); // call rerender in the cart page
    
  }

  function goToTitleDetail(){
    navigate('/title/' + props.item.title.slug);
    window.scrollTo(0, 0);
  }

  return (
    <div className='cart-item'>
      <div className='cart-item-checked'>
        <input type='checkbox' checked={checked} onChange={(e) => handleCheck(e)}/>
      </div>
      <div className='cart-item-img' onClick={goToTitleDetail}>
        <img src={props.item.title.image} alt={trimmedName}/>
      </div>
      <div className='cart-item-name' onClick={goToTitleDetail}>
        <span>{trimmedName}</span>
      </div>
      <div className='cart-item-unitprice'>
        <span>{new Intl.NumberFormat("de-DE").format(price)}đ</span>
      </div>
      <div className='cart-item-count'>
        <div className='cart-item-count-wrap'>
            <a className='cart-item-count-minus' onClick={minusHandle}><MinusOutlined/></a>
            <input type='number' className='cart-item-count-show' value={count} readOnly/>
            <a className='cart-item-count-plus' onClick={plusHandle}><PlusOutlined/></a>
        </div>
      </div>
      <div className='cart-item-total'>
        <span>{new Intl.NumberFormat("de-DE").format(price * count)}đ</span>
      </div>
      <div className='cart-item-removed'>
        <DeleteOutlined className='delete-outlined' onClick={deleteHandle}/>
      </div>
    </div>
  )
}

export default CartTitleItem