import './checkoutTitleItem.css'

function CheckoutTitleItem(props) {

  const [name, price, count] = [props.item.title?.name, props.item.title?.price, props.item?.count];
  const trimmedName = name?.length > 36 ? name.split(0, 36)+'...' : name;

  return (
    <div className='checkout-item'>
        <div className='wrap'>
            <div className='checkout-item-img'>
                <img src={props.item.title?.image} alt={trimmedName}/>
            </div>
            <div className='checkout-item-name'>
                <span>{trimmedName}</span>
            </div>
      </div>
      <div className='wrap'>
        <div className='checkout-item-unitprice'>
            <span>{new Intl.NumberFormat("de-DE").format(price)}đ</span>
        </div>
        <div className='checkout-item-count'>
            <span>{count}</span>
        </div>
        <div className='checkout-item-total'>
            <span>{new Intl.NumberFormat("de-DE").format(price * count)}đ</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutTitleItem