import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import './layout.css'

function PublicLayout(props) {
  return (
    <div className='public-layout' >
        <div className='header'>
          <NavBar/>
        </div>
        <div className='content'>
          {props.children}
        </div>
        <div className='footer'>
          <Footer/>
        </div>
    </div>
  )
}

export default PublicLayout