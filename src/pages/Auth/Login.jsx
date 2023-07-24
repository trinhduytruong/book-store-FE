import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import './auth.css'
import { CheckValidate } from '../../configs/config'
import { login } from '../../api/AuthAPI';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) navigate('/');
    
    // document.addEventListener('keydown', handleEnter);
    // return (() => document.removeEventListener('keydown', handleEnter));
  }, []);

  async function handleLogin (){
    
    const validated = CheckValidate(document, 'phone-number', 'password');
  
    if (validated) {
      const phoneNumber = document.getElementById('phone-number').value;
      const password = document.getElementById('password').value;

      const res = await login({phoneNumber, password});

      if (res.status == 401)
        alert('Sai số điện thoại hoặc mật khẩu!')
      else if(!res.ok)
        alert('Lỗi đăng nhập, hãy thử lại!')
      else {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('firstname', res.data.user.firstname ? res.data.user.firstname : '');
        Cookies.set('refreshToken', res.data.refreshToken, { expires: 30}); 
        navigate('/'); // fix navigate
      }
    }
  }

  // const handleEnter = (e) => {
  //   if (e.keyCode === 13) {
  //     handleLogin();
  //   }
  // }

  function goToRegister(){
    navigate('/register');
    window.scrollTo(0, 0);
  }

  return (
    <div className='background'>
      <div></div>
      <div className='login-box'>
        <p className='auth-title'>Đăng nhập</p>
        <input
          id='phone-number'
          className='input-form'
          placeholder='Nhập số điện thoại'
        />
        <p id='warning-phone-number' className='warning hidden'>Cần nhập số điện thoại</p>
        <input
          id='password'
          type='password'
          className='input-form'
          placeholder='Nhập mật khẩu'
        />
        <p id='warning-password' className='warning hidden'>Cần nhập mật khẩu</p>
        <button className='button-form' onClick={handleLogin}>Đăng nhập</button>
        <a className='register-tag' href='' onClick={goToRegister}>Tạo tài khoản</a>
      </div>
      <div></div>
    </div>
  )
}

export default Login;