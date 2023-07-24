import { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  RiseOutlined
} from '@ant-design/icons'
import './home.css'
import TitleItem from '../../components/Title/TitleItem';
import { CategoryList } from '../../configs/config';
import { ViewType } from '../../configs/global';
import { getUserTitle } from '../../api/TitleAPI';

function Home() {
  const [viewSelected, setViewSelected] = useState(ViewType.NEWEST);
  const [categorySelected, setCategorySelected] = useState(0);
  const [titles, setTitles] = useState([])

  useEffect(() => {
    async function fetchData() {
     
      const res = await getUserTitle(viewSelected);
    
      if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
      else setTitles(res.data)
    }

  fetchData();

  }, [])

  // newest, bestsellers or most-views
  async function selectTypeOfTrending(type){

    const res = await getUserTitle(type);
    
    if (!res.ok)
      alert('Gửi yêu cầu thất bại, hãy thử lại!')
    else setTitles(res.data)
    
    setViewSelected(type);
  }

  // vnese-books or foreign-books
  async function selectTypeOfCategory(type){
    setCategorySelected(type);
  }

  return (
    <div className='home'>
      <div className='home-box' id='categories'>
        <div className='home-box-title'>
          <AppstoreOutlined className='home-box-title-icon'/>
          <span className='home-box-title-name'>Danh mục sản phẩm</span>
          <div className='home-box-title-category'>
            <span 
              className={'home-box-title-category-order'+(categorySelected === 0 ? ' active' : '')} 
              onClick={()=>selectTypeOfCategory(0)}
            >
              Sách trong nước
            </span>
            <span 
              className={'home-box-title-category-order'+(categorySelected === 1 ? ' active' : '')} 
              onClick={()=>selectTypeOfCategory(1)}
            >
              Sách nước ngoài
            </span>
          </div>
        </div>
        <div className='home-separate-line'></div>
        <div className='home-categories-content'>
          {
            CategoryList[categorySelected].categories.map((item, i) => {
              return(
                <a key={i} className='home-categories-content-item' href={item.link}>
                  <img src={item.image} alt={item.name}/>
                  <span>{item.name}</span>
                </a>
              )
            })
          }
        </div>
      </div>

      <div className='home-box' id='trending'>
        <div className='home-box-title'>
          <RiseOutlined className='home-box-title-icon'/>
          <span className='home-box-title-name'>Xu hướng mua sắm</span>
          <div className='home-box-title-trending'>
            <span 
              className={'home-box-title-trending-order'+(viewSelected === ViewType.NEWEST ? ' active' : '')} 
              onClick={()=>selectTypeOfTrending(ViewType.NEWEST)}
            >
              Mới nhất
            </span>
            <span 
              className={'home-box-title-trending-order'+(viewSelected === ViewType.BEST_SELLERS ? ' active' : '')} 
              onClick={()=>selectTypeOfTrending(ViewType.BEST_SELLERS)}
            >
              Bán chạy nhất
            </span>
            <span 
              className={'home-box-title-trending-order'+(viewSelected === ViewType.MOST_VIEWS ? ' active' : '')} 
              onClick={()=>selectTypeOfTrending(ViewType.MOST_VIEWS)}
            >
              Nhiều lượt xem nhất
            </span>
          </div>
        </div>
        <div className='home-separate-line'></div>
        <div className='home-trending-content'>
          <div className='mnlt-content-list'>
            {titles.map((e, i) => {
              return (
                <div className='mnlt-content-list-wrap' key={i}>
                  <></>
                  <TitleItem title={e} />
                  <></>
                </div>
              )}
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home