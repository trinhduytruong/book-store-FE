import NavBar from '../components/NavBar/NavBar'
import './layout.css'

function OnlyHeaderLayout(props) {
  return (
    <div className='onlyheader-layout' >
        <div className='header'>
          <NavBar/>
        </div>
        <div className='content'>
            {props.children}
        </div>
    </div>
  )
}

export default OnlyHeaderLayout