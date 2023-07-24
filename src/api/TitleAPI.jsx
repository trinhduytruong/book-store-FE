import { CategoryList, SERVER_ADDR } from "../configs/config";

export const getUserTitle = async (sortType = 1, pageSize = 12, page = 1, status = 1) => {

    // status = 0: tất cả, status = 1: còn hàng
    const query = `?sortType=${sortType}&pageSize=${pageSize}&page=${page}&status=${status}`
 
    const response = await fetch(`${SERVER_ADDR}/title/user` + query);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}


export const getUserSearchingTitle = async (queryOptions = {}, viewOptions = {}) => {
    
    // status = 0: tất cả, status = 1: còn hàng
    const query = `?sortType=${viewOptions.sortType??1}&pageSize=${viewOptions.pageSize??12}&page=${viewOptions.page??1}&status=${viewOptions.status??0}`;

    let priceOptions = []
    if(queryOptions.priceOptions){
        if(queryOptions.priceOptions.price1) 
            priceOptions.push({ min: 0, max: 150000 })
        if(queryOptions.priceOptions.price2) 
            priceOptions.push({ min: 150000, max: 300000 })
        if(queryOptions.priceOptions.price3) 
            priceOptions.push({ min: 300000, max: 500000 })
        if(queryOptions.priceOptions.price4) 
            priceOptions.push({ min: 500000, max: 700000 })
        if(queryOptions.priceOptions.price5) 
            priceOptions.push({ min: 700000, max: 9999999 })
    }
    // [null,null,{"min":150000,"max":300000},null,{"min":500000,"max":700000},null]
    
    let pageOptions = []
    if(queryOptions.pageOptions){
        if(queryOptions.pageOptions.page1) 
            pageOptions.push({ min: 0, max: 100 })       
        if(queryOptions.pageOptions.page2) 
            pageOptions.push({ min: 100, max: 300 })
        if(queryOptions.pageOptions.page3) 
            pageOptions.push({ min: 300, max: 500 })
        if(queryOptions.pageOptions.page4) 
            pageOptions.push({ min: 500, max: 700 })
        if(queryOptions.pageOptions.page5) 
            pageOptions.push({ min: 700, max: 9999 })
    }

    let pYearOptions = []
    if(queryOptions.pYearOptions){
        if(queryOptions.pYearOptions.pYear1) 
            pYearOptions.push({ min: 0, max: 1995 })      
        if(queryOptions.pYearOptions.pYear2) 
            pYearOptions.push({ min: 1995, max: 2005 })
        if(queryOptions.pYearOptions.pYear3) 
            pYearOptions.push({ min: 2005, max: 2015 })
        if(queryOptions.pYearOptions.pYear4) 
            pYearOptions.push({ min: 2015, max: 2020 })
        if(queryOptions.pYearOptions.pYear5) 
            pYearOptions.push({ min: 2020, max: 2024 })
    }

    let category = []
    if(queryOptions.category){
        for(let i=0 ; i<CategoryList.length ; i++){
            if(queryOptions.category[0] == CategoryList[i].slug){
                const tmpList = CategoryList[i].categories;
                for(let j=0; j<tmpList.length; j++){
                    if(queryOptions.category[1] == tmpList[j].slug){
                        category = [i, tmpList[j].code]
                        break;
                    } 
                    else if(j + 1 == tmpList.length)
                        category = [i]
                }
            }
        }
    }
    //categoryOptions could be: [0] , [1], [0, 0], [0, 1],...,[1, 0], [1, 1],...

    const body = {
        priceOptions, pageOptions, pYearOptions, category, query: queryOptions.query ?? ''
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(body)
    };
    // console.log(options)
    
    const response = await fetch(`${SERVER_ADDR}/title/search` + query, options);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const getTitleBySlug = async (slug) => {

    const response = await fetch(`${SERVER_ADDR}/title/detail/` + slug);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}

export const getSlugByID = async (id) => {

    const response = await fetch(`${SERVER_ADDR}/title/slug/${id}`);
    
    const data = await response.json();
    console.log(data)

    return {data: data, status: response.status, ok: response.ok};

}
