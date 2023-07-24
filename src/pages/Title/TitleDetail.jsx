import './titleDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import 
  { MinusOutlined, 
    PlusOutlined,
    ShoppingCartOutlined, 
    RightOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { useEffect } from 'react';
import { getTitleBySlug } from '../../api/TitleAPI';
import { CategoryList, RefreshToken } from '../../configs/config';
import { addCartItem } from '../../api/CartAPI';

function TitleDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [title, setTitle] = useState({
    name: "Loading...", price: 0, authors: [""], translators: [""], publisher: "", 
    pYear: 0, page: 0, size: [0, 0, 0], category: ["Loading...", "Loading..."],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "", slug: "default-slug-4mm5BvC23", quantity: 0
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
     
      const res = await getTitleBySlug(slug);
    
      if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
      else{
        setTitle(res.data)
        if(res.data.quantity != 0)
          setCount(1);
      } 
    }

    fetchData();

  }, [slug]);

  const formattedPrice = new Intl.NumberFormat("de-DE").format(title.price);

  function getCategoryGroup(){
    const code = title.category[0];
    return CategoryList[code];
  }

  function getCategory(){
    const code = title.category[0];
    const subCode = title.category[1];
    return CategoryList[code]?.categories[subCode];
  }

  function minusHandle(){
    if(title.quantity != 0){
      const minus = count - 1;
      if(minus >= 1) setCount(minus);
    }
  }

  function plusHandle(){
    if(title.quantity != 0){
      const plus = count + 1;
      if(plus <= title.quantity) setCount(plus);
    }
  }

  async function handleAddToCart(){
    const validRefToken = await RefreshToken();
    if(!validRefToken){
      navigate('/login');
      return;
    } 

    const token = localStorage.getItem('accessToken');
    const res = await addCartItem(token, {titleID: title._id, count: count});

    if(res.status == 400)
      alert('Vượt quá số lượng cho phép, hãy thử lại!')
    else if (!res.ok)
      alert('Gửi yêu cầu thất bại, hãy thử lại!')
    else alert('Thêm vào giỏ hàng thành công!')
  }

  async function handleBuyNow(){
    const validRefToken = await RefreshToken();
    if(!validRefToken){
      navigate('/login');
      return;
    } 

    const token = localStorage.getItem('accessToken');
    const res = await addCartItem(token, {titleID: title._id, count: count, isChecked: true});

    if(res.status == 400)
      alert('Vượt quá số lượng cho phép, hãy thử lại!')
    else if (!res.ok)
      alert('Gửi yêu cầu thất bại, hãy thử lại!')
    else{
      navigate('/cart');
      window.scrollTo(0, 0);
    } 
  }

  return (
    <div className='titledetail-page'>
      <div className='titledetail-breadcrumb'>
        <span className='titledetail-breadcrumb-item' onClick={() => navigate('/')}>TRANG CHỦ</span>
        <RightOutlined className='titledetail-breadcrumb-arrow'/>
        <span className='titledetail-breadcrumb-item' 
          onClick={() => navigate(`/${getCategoryGroup()?.slug}`)}
        >
          {getCategoryGroup()?.name.toUpperCase() ?? 'Loading...'}
        </span>
        <RightOutlined className='titledetail-breadcrumb-arrow'/>
        <span className='titledetail-breadcrumb-item' 
          onClick={() => navigate(`/${getCategoryGroup()?.slug}?cat=${getCategory()?.slug}`)}
        >
          {getCategory()?.name.toUpperCase() ?? 'Loading...'}
        </span>
      </div>
      <div className='titledetail-view'>
          <div className='titledetail-view-img'>
              <img src={title.image}/>
          </div>
          <div className='titledetail-view-sideinfo'>
              <div className='view-sideinfo-info-wrap'>
                <h2 className='view-sideinfo-name'>
                  {title.name}
                </h2>
                <div className='view-sideinfo-addition'>
                  <div className='sideinfo-addition-wrap'>
                    <label className='sideinfo-addition-label'>Nhà xuất bản:</label> 
                    <span className='sideinfo-addition-content'>{title.publisher}</span>
                  </div>
                  <div className='sideinfo-addition-wrap'>
                    <label className='sideinfo-addition-label'>Tác giả:</label> 
                    <span className='sideinfo-addition-content'>{title.authors.join(', ')}</span>
                  </div>
                  
                </div>
                <div className='view-sideinfo-price'>
                  {formattedPrice} đ
                </div>
                <div className='view-sideinfo-policy-wrap'>
                    <label className='sideinfo-policy-label'>Chính sách đổi trả</label> 
                    <span className='sideinfo-policy-content'>Đổi trả sản phẩm trong 30 ngày</span>
                    <span className='sideinfo-policy-formore'>Xem thêm</span>
                </div>
                <div className='view-sideinfo-count'>
                  <label className='sideinfo-count-label'>Số lượng:</label>
                  <div className='sideinfo-count-wrap'>
                    <div className='cart-item-count-wrap'>
                      <a className='cart-item-count-minus' onClick={minusHandle}><MinusOutlined/></a>
                      <input type='number' className='cart-item-count-show' value={count} readOnly/>
                      <a className='cart-item-count-plus' onClick={plusHandle}><PlusOutlined/></a>
                    </div>
                  </div>
                  <span className='sideinfo-count-quantity'>Còn {title.quantity} sản phẩm</span>
                  
                </div>
              </div>
              
              <div className='view-sideinfo-action-wrap' >
                <div className='view-sideinfo-action-wrap' style={{display: (title.quantity == 0 ? 'none' : 'flex'), margin: 0}}>
                  <div className='view-sideinfo-action-addcart' onClick={handleAddToCart}>
                    <ShoppingCartOutlined className='view-sideinfo-action-addcart-icon' />
                    Thêm vào giỏ hàng
                  </div>
                  <div className='view-sideinfo-action-buynow' onClick={handleBuyNow}>
                    Mua ngay
                  </div>
                </div>
                <div style={{display: (title.quantity != 0 ? 'none' : 'flex'), borderRadius: '5px', 
                      background: '#ffcaca', fontSize: '24px', padding: '4px 8px', color: '#f63b2f'}}
                >
                  Sản phẩm tạm hết hàng
                </div>
                 
              </div>
          </div>
      </div>

      <div className='titledetail-info'>
        <div className='titledetail-info-title'>
          <span>Thông tin chi tiết</span>
        </div>
        <div className='titledetail-info-content'>
          <table className='titledetail-info-content-table'>
            <tbody>
              <tr>
                <td className='titledetail-info-content-label'>Mã sách</td>
                <td>{title._id}</td>
              </tr>
              <tr>
                <td className='titledetail-info-content-label'>Tác giả</td>
                <td>{title.authors.join(', ')}</td>
              </tr>
              <tr>
                <td className='titledetail-info-content-label'>Người dịch</td>
                <td>{title.translators.join(', ')}</td>
              </tr>
              <tr>
                <td className='titledetail-info-content-label'>Nhà xuất bản</td>
                <td>{title.publisher}</td>
              </tr>
              <tr>
                <td className='titledetail-info-content-label'>Năm xuất bản</td>
                <td>{title.pYear}</td>
              </tr>
              <tr>
                <td className='titledetail-info-content-label'>Kích thước</td>
                <td>{title.size.join(' x ')} cm</td>
              </tr>
              <tr>
                <td className='titledetail-info-content-label'>Số trang</td>
                <td>{title.page}</td>
              </tr>
            </tbody>
          </table>
          <div className='titledetail-separate-line'></div>
          <div className='titledetail-info-content-description'>
            <div className='titledetail-info-content-label'>Mô tả</div>
            <div className='description-content'>
              {title.description}
            </div>
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default TitleDetail