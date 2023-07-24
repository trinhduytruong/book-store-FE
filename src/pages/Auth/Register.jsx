import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import './auth.css'
import { CheckValidate } from '../../configs/config'
import { signup } from '../../api/AuthAPI';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) navigate('/');
  }, []);

  const checkValidate = () => {
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;
    
    let flag = true;
    flag = CheckValidate(document, 'phone-number', 'password');

    const warning = document.getElementById('warning-password-check');
    // show warning if password check is empty or wrong
    if (passwordCheck) {
      if (passwordCheck !== password) {
        warning.classList.remove('hidden');
        flag = false;
      }
      else warning.classList.add('hidden');
    }
    else {
      warning.classList.remove('hidden');
      flag = false;
    }

    return flag;
  }

  const handleSignUp = async () => {

    if (checkValidate()) {
      const phoneNumber = document.getElementById('phone-number').value;
      const password = document.getElementById('password').value;

      const res = await signup({phoneNumber, password});

      if (res.status == 409)
        alert('Số điện thoại đã tồn tại!')
      else if(!res.ok)
        alert('Lỗi tạo tài khoản, hãy thử lại!')
      else {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('firstname', res.data.user.firstname ? res.data.user.firstname : '');
        Cookies.set('refreshToken', res.data.refreshToken, { expires: 30}); 
        navigate('/profile/account-info');
        window.scrollTo(0, 0);
      }
    }
  }

  return (
    <div className='background'>
      <div></div>
      <div className='login-box register-box'>
      <p className='auth-title'><b>Đăng ký</b></p>
          <div className='authen-info'>
            <input
              id='phone-number'
              className='input-form'
              placeholder='Nhập số điện thoại đăng ký'
            />
            <p id='warning-phone-number' className='warning hidden'>Cần nhập số điện thoại</p>
            <input
              id='password'
              type='password'
              className='input-form'
              placeholder='Nhập mật khẩu'
            />
            <p id='warning-password' className='warning hidden'>Cần nhập mật khẩu</p>
            <input
              id='password-check'
              type='password'
              className='input-form'
              placeholder='Nhập lại mật khẩu'
            />
            <p id='warning-password-check' className='warning hidden'>Cần nhập lại mật khẩu</p>
        </div>
        <button className='button-form' onClick={handleSignUp}>Đăng ký</button>
      </div>
      <div></div>
    </div>
  )
}

export default Register