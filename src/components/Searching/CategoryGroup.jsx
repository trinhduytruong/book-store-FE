import './searching.css';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryList } from '../../configs/config';

function CategoryGroup(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const allParams = {};
    for (const [key, value] of searchParams.entries())
        allParams[key] = value;
    
    // set cat=null if cat is not in catList (to handle highlighting the category label)
    let cat = allParams.cat;
    const catList = CategoryList[props.type].categories;
    for(let i = 0; i< catList.length; i++){
        if(cat == catList[i].slug)
            break;
        else if(i + 1 == catList.length)
            cat = null;
    }

    // set current category to url params
    function handleCategoryParams(params = null){
     
        if(params){
            const query = {...allParams, cat: params}
            setSearchParams(query, { replace: true })
        }
        else {
            delete allParams.cat;
            setSearchParams({...allParams}, { replace: true })
        }
    }

    function goToCatalogSearch(){
        delete allParams.cat;
        console.log(allParams)
        navigate({
            pathname: '/catalog-search', 
            search: `?${createSearchParams(allParams)}`
        })
    }


    return (
        <div className='category-wrap'>
            <div className='category-item-wrap' onClick={goToCatalogSearch}>
                Tất cả nhóm sản phẩm
            </div>
            <div className='category-item-selected-wrap'>
                <div className={'subcategory-item-wrap title'+ (cat ? '' : ' selected')}
                    onClick={() => handleCategoryParams()}
                >
                    {CategoryList[props.type].name}
                </div>
                {
                    CategoryList[props.type].categories.map((item) => {
                        const selected = (cat == item.slug ? ' selected' : '');
                        return (
                            <div className={'subcategory-item-wrap'+ selected} key={item.code}
                                onClick={() => handleCategoryParams(item.slug)}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div> 
        </div>
    
  )
}

export default CategoryGroup