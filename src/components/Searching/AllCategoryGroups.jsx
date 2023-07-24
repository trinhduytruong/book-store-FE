import './searching.css';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryList } from '../../configs/config';

function AllCategoryGroup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const allParams = {};
    for (const [key, value] of searchParams.entries())
        allParams[key] = value;
    
    function goToCategoryGroup(categoryGroup){
        delete allParams.cat;
        navigate({
            pathname: `/${categoryGroup}`, 
            search: `?${createSearchParams(allParams)}`
        })
    }

    return (
        <div className='category-wrap'>
            <div className='category-item-wrap' onClick={() => goToCategoryGroup(CategoryList[0].slug)}>
                {CategoryList[0].name}
            </div>
            <div className='category-item-wrap' onClick={() => goToCategoryGroup(CategoryList[1].slug)}>
                {CategoryList[1].name}
            </div> 
        </div>
    
  )
}

export default AllCategoryGroup