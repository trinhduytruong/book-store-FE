import { useNavigate } from 'react-router-dom'
import {
  SearchOutlined
} from '@ant-design/icons'
import logo from '../../images/logo.png'
import './navBar.css'
import Menu from './Menu'


function NavBar() {
  const navigate = useNavigate();

  const handleSearch = () => {
    let search = document.querySelector('.input-search').value;
    if (search)
      navigate(`/catalog-search?q=${search}`);
    else 
      navigate('/catalog-search');
    window.scrollTo(0, 0)
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) handleSearch();
  }

  function goToHome(){
    navigate('/');
    window.scrollTo(0, 0);
  }

  return (
    <div className='nav-bar'>
      <div className='header-left'>
         <img className='logo-img' src={logo} alt='logo' onClick={goToHome}/>
      </div>
     
      <div className='header-center' >
        <div className='search-box'>
          <input className='input-search' placeholder='Tìm kiếm' onKeyDown={handleEnter}></input>
          <button className='btn-search' onClick={handleSearch}>
            <SearchOutlined className='icon-search' />
          </button>
        </div>
      </div>

      <div className='header-right'>
        <Menu/>
      </div>
    
    </div>
  )
}

export default NavBar;