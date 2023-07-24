import "./orderItem.css";
import moment from "moment-timezone";
import { OrderStatus } from "../../configs/global";
import { useNavigate } from "react-router";

function OrderItem(props) {
  const navigate = useNavigate();
  const name = props.orderInfo.recipientInfo;
  const finalPrice = props.orderInfo.finalPrice;
  const date = props.orderInfo.createdAt;
  const trimmedName =
    name?.length > 20
      ? "..." + name.split(name.length - 1, name.length - 21)
      : name;
  const createdDateTime = date
    ? moment(date).tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD - HH:mm")
    : "";
  const createdDate = date
    ? moment(date).tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD")
    : "";

  let status;
  switch (props.orderInfo.status) {
    case OrderStatus.PENDING:
      status = "Chờ xác nhận";
      break;
    case OrderStatus.PROCESSING:
      status = "Đang xử lý";
      break;
    case OrderStatus.COMPLETED:
      status = "Hoàn tất";
      break;
    case OrderStatus.CANCELED:
      status = "Bị hủy";
      break;
  }

  function goToDetail() {
    navigate(`/profile/orders/detail/${props.orderInfo._id}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className="order-item">
      <div className="order-item-id">
        <span>{props.orderInfo._id}</span>
      </div>
      <div className="order-item-date">
        <div id="order-item-date-1">{createdDateTime}</div>
        <div id="order-item-date-2">{createdDate}</div>
      </div>
      <div className="order-item-recipient">
        <span>{trimmedName}</span>
      </div>
      <div className="order-item-total">
        <span>{new Intl.NumberFormat("de-DE").format(finalPrice)} đ</span>
      </div>
      <div className="order-item-state">
        <span>{status}</span>
      </div>
      <div className="order-item-see-detail" onClick={goToDetail}>
        <span>{"Xem chi tiết"}</span>
      </div>
    </div>
  );
}

export default OrderItem;
