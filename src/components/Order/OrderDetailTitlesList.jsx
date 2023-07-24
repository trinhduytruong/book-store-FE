import './orderDetailTitlesList.css'
import { useNavigate } from 'react-router'
import { getSlugByID } from '../../api/TitleAPI'


function OrderDetailTitlesList(props){
    const navigate = useNavigate();

    async function goToTitle(id){
        const res = await getSlugByID(id);
    
        if (!res.ok)
            alert('Gửi yêu cầu thất bại, hãy thử lại!')
        else{
            navigate(`/title/${res.data.slug}`);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className="title-list-wrap">
            <div className='title-list-header'>
                <div className='title-list-header-image'>
                    <span>Hình ảnh</span>
                </div>
                <div className='title-list-header-name'>
                    <span>Sản phẩm</span>
                </div>
                <div className='title-list-header-sku'>
                    <span>SKU</span>
                </div>
                <div className='title-list-header-unitprice'>
                    <span>Đơn giá</span>
                </div>
                <div className='title-list-header-count'>
                    <span>SL</span>
                </div>
                <div className='title-list-header-totalprice'>
                    <span>Số tiền</span>
                </div>
            </div>
            <div style={{display:(props.items?.length == 0 ? 'flex' : 'none'),
                  padding: '8px', color: '#7a7e7f', justifyContent:'center'}}
              >
                Bạn chưa có sản phẩm nào.
            </div>
            <div className='title-list-items'>
            {
                props.items?.map((item, i)=>{
                    const [name, price, count] = [item.name, item.price, item.count];
                    const trimmedName = name?.length > 36 ? name.split(0, 36)+'...' : name;
                    return(
                        <div className='title-list-items-wrap'>
                            <div className='title-list-item-image'>
                                <img src={item.image} alt={trimmedName}/>
                            </div>
                            <div className='title-list-item-name' onClick={() => goToTitle(item.titleID)}>
                                <span>{trimmedName}</span>
                            </div>
                            <div className='title-list-item-sku'>
                                {item.bookIDs?.map((e, i) => {
                                    return  <><span key={i}>{e}</span><br/></>
                                })}
                               
                            </div>
                            <div className='title-list-item-unitprice'>
                                <span>{new Intl.NumberFormat("de-DE").format(price)} đ</span>
                            </div>
                            <div className='title-list-item-count'>
                                <span>{count}</span>
                            </div>
                            <div className='title-list-item-totalprice'>
                                <span>{new Intl.NumberFormat("de-DE").format(price * count)} đ</span>
                            </div>
                        </div>
                    )
                })
            }
            </div> 
            <div className='end-checkout-info'>
            <div className='end-checkout-total-price'>
                <div>Thành tiền:</div>
                <div className='price' style={{fontWeight: '600'}}>
                {new Intl.NumberFormat("de-DE").format(props.price.totalPrice)} đ
                </div>
            </div>
            <div className='end-checkout-shipping-price'>
                <div>Phí vận chuyển:</div>
                <div className='price' style={{fontWeight: '600'}}>
                {new Intl.NumberFormat("de-DE").format(props.price.shippingCost)} đ
                </div>
            </div>
            <div className='end-checkout-final-price' style={{fontWeight: '600', fontSize: '18px'}}>
                <div >Tổng số tiền:</div>
                <div className='price' style={{fontWeight: '700', color: '#c93333'}}>
                {new Intl.NumberFormat("de-DE").format(props.price.finalPrice)} đ
                </div>
            </div>

            </div>
        </div>

    )
}

export default OrderDetailTitlesList