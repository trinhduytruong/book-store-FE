import React from 'react';
import { CDBModalFooter, CDBBtn, CDBIcon, CDBBox } from 'cdbreact';
import logo from '../../images/logo.png'
import {EnvironmentFilled, MailFilled, PhoneFilled} from '@ant-design/icons'

export default function Footer (){
  return (
    <CDBModalFooter className="non-shadow" style={{ backgroundColor: '#b1b1b1' }}>
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '100%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox alignSelf="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt="book-store" src={logo} width="200px" />
              {/* <span className="ml-3 h4 font-weight-bold">BrightBook</span> */}
            </a>
            <p className="my-3" style={{ width: '290px' }}>
              Chúng tôi chuyên cung cấp cho người dùng những cuốn sách chất lượng, chính thống và hoàn hảo. Mang đến cho bạn đọc một trải nghiệm trên cả tuyệt vời!
            </p>
            <CDBBox className="mt-5" display="flex">
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3 p-2">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Brightbook
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <span href="/">Sản phẩm</span>
              <span href="/">Về chúng tôi</span>
              <span href="/">Hệ thống trung tâm - cửa hàng</span>
              <span href="/">Liên hệ hợp tác</span>
            </CDBBox>
          </CDBBox>
          {/* <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Dịch vụ
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <span href="/">Điều khoản sử dụng</span>
              <span href="/">Chính sách bảo mật</span>
              
            </CDBBox>
          </CDBBox> */}
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Hỗ trợ
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <span href="/">Điều khoản sử dụng</span>
              <span href="/">FAQ</span>
              <span href="/">Chính sách bảo mật</span>
              {/* <span href="/">Chính sách đổi - trả</span> */}
              <span href="/">Chính sách bảo hành</span>
              <span href="/">Chính sách vận chuyển</span>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Liên hệ
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <span style={{ display: 'flex', alignItems:'center' }} href="/">
                <EnvironmentFilled style={{ marginRight: '8px' }}/> HUST, Bách Khoa, HBT, HN
              </span>
              <span style={{ display: 'flex', alignItems:'center' }} href="/">
                <MailFilled style={{ marginRight: '8px' }}/> brightbook@contact.com
              </span>
              <span style={{ display: 'flex', alignItems:'center' }} href="/">
                <PhoneFilled style={{ marginRight: '8px' }}/> 19001001
              </span>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">&copy; Brightbook, 2023. All rights reserved.</small>
      </CDBBox>
    </CDBModalFooter>
  );
};