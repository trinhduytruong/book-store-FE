import './orderDetail.css'
import './profile.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategorySide from '../../components/Profile/CategorySide';
import { RefreshToken } from '../../configs/config';
import { OrderStatus } from '../../configs/global';
import { getOrderDetail } from '../../api/OrderAPI';
import moment from 'moment-timezone';
import { getDistrictName, getProvinceName, getWardName } from '../../configs/VietnameseAddresses';
import OrderDetailTitlesList from '../../components/Order/OrderDetailTitlesList';

function OrderDetail(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState('Loading...');
    const [notes, setNotes] = useState('Loading...');
    const [finalPrice, setFinalPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [status, setStatus] = useState(3);
    const [addr, setAddr] = useState([]);
    const [items, setItems] = useState([''])

    useEffect(()=>{
        async function fetchProfileData() {
            const validRefToken = await RefreshToken();
            if(!validRefToken){
              navigate('/login');
              return;
            } 

            const token = localStorage.getItem('accessToken');
            
            const res = await getOrderDetail(token, id);
    
            if (!res.ok)
                alert('Gửi yêu cầu thất bại, hãy thử lại!')
            else {
                const createdDateTime = moment(res.data.createdAt).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD - HH:mm');
                setDate(createdDateTime);
               
                if(res.data.notes) setNotes(res.data.notes);
                else setNotes('[Không có]');

                const tmpAddr = res.data.recipientInfo;
                if(tmpAddr.length != 0){
                    tmpAddr[4] = getWardName(tmpAddr[2], tmpAddr[3], tmpAddr[4]);
                    tmpAddr[3] = getDistrictName(tmpAddr[2], tmpAddr[3]);
                    tmpAddr[2] = getProvinceName(tmpAddr[2]);
                    setAddr(tmpAddr);
                }
                setStatus(res.data.status);
                setFinalPrice(res.data.finalPrice);
                setItems(res.data.items);
                setShippingCost(res.data.shippingCost);
                setTotalPrice(res.data.totalPrice);
                
            }
        }

        fetchProfileData();
          
    }, []);

    function renderStatus(){
        switch(status){
            case(OrderStatus.PENDING):
                return 'Chờ xác nhận';
            case(OrderStatus.PROCESSING):
                return 'Đang xử lý';
            case(OrderStatus.COMPLETED):
                return 'Hoàn tất';
            case(OrderStatus.CANCELED):
                return 'Bị hủy';
            default:
                return 'Loading...';
        }
    }

    return(
        <div className='profile-page'>
            <div className='profile-left-side'>
                <CategorySide index='4'/>
            </div>

            <div className='profile-right-side'>
                <div className='profile-right-side-label'>
                    <span>CHI TIẾT ĐƠN HÀNG</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='profile-info-content'>
                    <p className='p'>Tình trạng: 
                        <span className={'order-status ' + `n${status}`}>
                            {renderStatus()}
                        </span>
                    </p>
                    <p className='p'>Mã đơn hàng: <span>{id}</span></p>
                    <p className='p'>Ngày mua: <span>{date}</span></p>
                    <p className='p'>Tổng tiền: <span>{new Intl.NumberFormat("de-DE").format(finalPrice)} đ</span></p>
                    <p className='p'>Ghi chú: <span style={{fontWeight: 400}}>{notes}</span></p>
                </div>
                
                <div className='profile-right-side-block'>
                    <div className='profile-right-side-block-recipientInfo'>
                        <div className='profile-right-side-label'>
                            <span>THÔNG TIN NGƯỜI NHẬN</span>
                        </div>
                        <div className='titledetail-separate-line'></div> 
                        <div className='my-address-info-content'>
                            <p className={'p' + (addr.length == 0 ? '' : ' ma-hidden')}><i>Chưa có</i></p>
                            <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[0]}</p>
                            <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[5]}</p>
                            <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>{addr[4] + ', ' + addr[3] + ', ' + addr[2]}</p>
                            <p className={'p' + (addr.length == 0 ? ' ma-hidden' : '')}>Tel: {addr[1]}</p>
                        </div>
                    </div>
                    <div className='profile-right-side-block-shipping'>
                        <div className='profile-right-side-label'>
                            <span>PHƯƠNG THỨC VẬN CHUYỂN</span>
                        </div>
                        <div className='titledetail-separate-line'></div> 
                        <div className='my-address-info-content'>
                            <p className='p'>Giao hàng tiêu chuẩn</p>
                        </div>
                    </div>
                    <div className='profile-right-side-block-payment'>
                        <div className='profile-right-side-label'>
                            <span>PHƯƠNG THỨC THANH TOÁN</span>
                        </div>
                        <div className='titledetail-separate-line'></div> 
                        <div className='my-address-info-content'>
                            <p className='p'>Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                    </div>
                </div>
                <div className='profile-right-side-label my-address'>
                    <span>DANH SÁCH SẢN PHẨM</span>
                </div>
                <div className='titledetail-separate-line'></div> 
                <div className='my-address-info-content'>
                    <OrderDetailTitlesList items={items} price={{totalPrice, shippingCost, finalPrice}}/>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;