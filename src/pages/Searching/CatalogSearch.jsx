import './catalogSearch.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons'
import { CategoryList } from '../../configs/config';
import SearchingTitleItem from '../../components/Title/SearchingTitleItem';
import AllCategoryGroup from '../../components/Searching/AllCategoryGroups';
import CategoryGroup from '../../components/Searching/CategoryGroup';
import { useEffect, useState } from 'react';
import { ViewType } from '../../configs/global';
import { getUserSearchingTitle } from '../../api/TitleAPI';

function CatalogSearch(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [priceOptions, setPriceOptions] = useState({
    price1: false, price2: false, price3: false, price4: false, price5: false
  })
  const [pageOptions, setPageOptions] = useState({
    page1: false, page2: false, page3: false, page4: false, page5: false
  })
  const [pYearOptions, setPYearOptions] = useState({
    pYear1: false, pYear2: false, pYear3: false, pYear4: false, pYear5: false
  })
  const [orderBy, setOrderBy] = useState(ViewType.NEWEST);
  const [itemQuantity, setItemQuantity] = useState(12);
  const [itemStatus, setItemStatus] = useState(0);
  const [titles, setTitles] = useState([]);

  function getSearchingType(){
    switch(props.type){
      case('catalog-search'):
        return <AllCategoryGroup/>;
      case(CategoryList[0].slug):
        return <CategoryGroup type={0} />;
      case(CategoryList[1].slug):
        return <CategoryGroup type={1} />
    }
  }

  function getBreadCrumbType(){
    switch(props.type){
      case('catalog-search'):
        return <></>;
      case(CategoryList[0].slug):
        return (
          <>
            <RightOutlined className='titledetail-breadcrumb-arrow'/>
            <span className='titledetail-breadcrumb-item' onClick={() => navigate(`/${props.type}`)}>
              {CategoryList[0].name.toUpperCase()}
            </span>
          </>
        )
      case(CategoryList[1].slug):
        return (
          <>
            <RightOutlined className='titledetail-breadcrumb-arrow'/>
            <span className='titledetail-breadcrumb-item' onClick={() => navigate(`/${props.type}`)}>
              {CategoryList[1].name.toUpperCase()}
            </span>
          </>
        )
    }
  }

  function handlePriceChange(e) {
    const { id, checked } = e.target;
    setPriceOptions(prevState => ({ ...prevState, [id]: checked }));
  }

  function handlePageChange(e) {
    const { id, checked } = e.target;
    setPageOptions(prevState => ({ ...prevState, [id]: checked }));
  }
  
  function handlePYearChange(e) {
    const { id, checked } = e.target;
    setPYearOptions(prevState => ({ ...prevState, [id]: checked }));
  }
  

  useEffect(() => {
    const viewOptions = {sortType: orderBy, pageSize: itemQuantity, page: 1, status: itemStatus};
    const queryOptions = {priceOptions, pageOptions, pYearOptions, query: searchParams.get('q')
                            , category: [props.type, searchParams.get('cat')]}
    
    async function fetchData() {
     
      const res = await getUserSearchingTitle(queryOptions, viewOptions);
    
      if (!res.ok)
        alert('Gửi yêu cầu thất bại, hãy thử lại!')
      else setTitles(res.data)
    }

    fetchData();
    
  }, [priceOptions, pageOptions, pYearOptions, orderBy, itemStatus, itemQuantity, searchParams, props.type])

  function onOrderByChange(e){
    setOrderBy(e.target.value);
  }

  function onItemStatusChange(e){
    setItemStatus(e.target.value);
  }

  function onItemQuantityChange(e){
    setItemQuantity(e.target.value);
  }

  return (
    <div className='catalogsearch-page'>
      <div className='titledetail-breadcrumb'>
        <span className='titledetail-breadcrumb-item' onClick={() => navigate('/')}>
          TRANG CHỦ
        </span>
        {
          getBreadCrumbType()
        }
        <RightOutlined className='titledetail-breadcrumb-arrow'/>
        <span className='titledetail-breadcrumb-item' id='breadcrumb-searching-item'>
          {searchParams.get('q') ? `KẾT QUẢ TÌM KIẾM VỚI: ${searchParams.get('q')}` : 'TẤT CẢ KẾT QUẢ TÌM KIẾM'}
        </span>
      </div>
      <div className='catalogsearch-main'>
        <div className='catalogsearch-filter'>
            <div className='catalogsearch-filter-label'>
                <span>Lọc sản phẩm</span>    
            </div>   
            <div className='titledetail-separate-line'></div> 
            <div className='filter-item'>
                <div className='filter-item-label'>
                    <span>Nhóm sản phẩm</span>
                </div>
                { 
                  getSearchingType() 
                }
            </div>
            <div className='titledetail-separate-line'></div>
      
            <div className='filter-item'>
                <div className='filter-item-label'>
                    <span>Giá</span>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="price1" name="price" checked={priceOptions.price1} onChange={handlePriceChange}/>
                  <label htmlFor="price1">Dưới 150.000đ</label>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="price2" name="price" checked={priceOptions.price2} onChange={handlePriceChange}/>
                  <label htmlFor="price2">150.000đ - 300.000đ</label>
                </div> 
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="price3" name="price" checked={priceOptions.price3} onChange={handlePriceChange}/>
                  <label htmlFor="price3">300.000đ - 500.000đ</label>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="price4" name="price" checked={priceOptions.price4} onChange={handlePriceChange}/>
                  <label htmlFor="price4">500.000đ - 700.000đ</label>
                </div> 
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="price5" name="price" checked={priceOptions.price5} onChange={handlePriceChange}/>
                  <label htmlFor="price5">700.000đ trở lên</label>
                </div> 
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className='filter-item'>
                <div className='filter-item-label'>
                    <span>Số trang</span>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="page1" name="page" checked={pageOptions.page1} onChange={handlePageChange}/>
                  <label htmlFor="page1">Dưới 100 trang</label>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="page2" name="page" checked={pageOptions.page2} onChange={handlePageChange}/>
                  <label htmlFor="page2">100 - 300 trang</label>
                </div> 
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="page3" name="page" checked={pageOptions.page3} onChange={handlePageChange}/>
                  <label htmlFor="page3">300 - 500 trang</label>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="page4" name="page" checked={pageOptions.page4} onChange={handlePageChange}/>
                  <label htmlFor="page4">500 - 700 trang</label>
                </div> 
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="page5" name="page" checked={pageOptions.page5} onChange={handlePageChange}/>
                  <label htmlFor="page5">700 trang trở lên</label>
                </div> 
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className='filter-item'>
                <div className='filter-item-label'>
                    <span>Năm xuất bản</span>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="pYear1" name="pYear" checked={pYearOptions.pYear1} onChange={handlePYearChange}/>
                  <label htmlFor="pYear1">Trước 1995</label>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="pYear2" name="pYear" checked={pYearOptions.pYear2} onChange={handlePYearChange}/>
                  <label htmlFor="pYear2">1995 - 2005</label>
                </div> 
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="pYear3" name="pYear" checked={pYearOptions.pYear3} onChange={handlePYearChange}/>
                  <label htmlFor="pYear3">2005 - 2015</label>
                </div>
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="pYear4" name="pYear" checked={pYearOptions.pYear4} onChange={handlePYearChange}/>
                  <label htmlFor="pYear4">2015 - 2020</label>
                </div> 
                <div className='filter-checkbox-wrap'>
                  <input type="checkbox" id="pYear5" name="pYear" checked={pYearOptions.pYear5} onChange={handlePYearChange}/>
                  <label htmlFor="pYear5">2020 - Nay</label>
                </div> 
            </div>
            <div className='titledetail-separate-line'></div> 
            
        </div>

        <div className='catalogsearch-result'>
            <div className='catalogsearch-result-wrap'>
              <div className='catalogsearch-result-label'>
                  <span>
                  {searchParams.get('q') ? `Kết quả tìm kiếm với: ${searchParams.get('q')}` : 'Tất cả kết quả tìm kiếm'}  
                  </span>    
              </div>  
              <div className='catalogsearch-filter-toolbar'>
                  <span className='toolbar-filter-label'>Sắp xếp theo:</span>
                  <select id="orderby-select" className='toolbar-filter-select' 
                    value={orderBy} onChange={onOrderByChange} 
                  >
                    <option value={ViewType.NEWEST} >Mới nhất</option>
                    <option value={ViewType.BEST_SELLERS} >Bán chạy nhất</option>
                    <option value={ViewType.MOST_VIEWS} >Xem nhiều nhất</option>
                    <option value={ViewType.LO_TO_HI} >Giá: Thấp đến Cao</option>
                    <option value={ViewType.HI_TO_LO} >Giá: Cao đến Thấp</option>
                  </select>   
                  <select id="status-select" className='toolbar-filter-select' 
                    value={itemStatus} onChange={onItemStatusChange}
                  >
                    <option value="0" >Tất cả</option>
                    <option value="1" >Còn hàng</option>
                  </select>   
                  <select id="quantity-select" className='toolbar-filter-select' 
                    value={itemQuantity} onChange={onItemQuantityChange}
                  >
                    <option value="12"  >12 sản phẩm</option>
                    <option value="24"  >24 sản phẩm</option>
                    <option value="36"  >36 sản phẩm</option>
                  </select>    
              </div> 
            </div>
            <div className='titledetail-separate-line'></div> 
            <div className='titledetail-result-content'>
              <div style={{display:(titles?.length == 0 ? 'flex' : 'none'),
                  padding: '8px', color: '#7a7e7f', justifyContent:'center'}}
              >
                Không có sản phẩm phù hợp.
              </div>
              <div className='slt-content-list'>
                {titles.map((e, index) => {
                  return (
                    <div className='slt-content-list-wrap' key={index}>
                      <></>
                      <SearchingTitleItem
                        img={e.image}
                        name={e.name}
                        price={e.price}
                        sold={e.sold}
                        title={e}
                      />
                      <></>
                    </div>
                  )}
                )}
              </div>
            </div>
        </div>
      </div>
      
    </div>
    
  )
}

export default CatalogSearch