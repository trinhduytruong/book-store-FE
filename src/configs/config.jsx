import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import { getRefreshToken } from "../api/SiteAPI";


export const SERVER_ADDR = 'http://localhost:8888'

export const CheckValidate = (doc, ...items) => {
    let flag = true;
    items.map((item) =>{
        const val = doc.getElementById(item).value;
        let warning = doc.getElementById('warning-'+ item);

        // Show warning if item is empty
        if(!val || val == "select-placeholder"){
            warning.classList.remove('hidden');
            flag = false   
        }
                 
        else
            warning.classList.add('hidden');
    }) 
    return flag;
}

export const RefreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(accessToken);

    if(Date.now() >= decodedToken.exp * 1000){
        const refreshToken = Cookies.get('refreshToken');
        console.log(refreshToken)
        
        const res = await getRefreshToken(refreshToken);

        if(!res.ok){
            alert('Bạn cần đăng nhập lại!')
            localStorage.removeItem('accessToken');
            localStorage.removeItem('firstname');
            Cookies.remove('refreshToken');
            return false;
        }

        localStorage.setItem('accessToken', res.data.accessToken);
        Cookies.set('refreshToken', res.data.refreshToken, { expires: 30}); 
    }
    else console.log('valid token')

    return true;
}

export const CategoryList = [
    {
        code: 0,
        name: 'Sách trong nước',
        slug: 'vietnamese-books',
        categories: [
            {
                code: 0,
                name: 'Tiểu thuyết',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_240307.jpg',
                link: `/vietnamese-books?cat=tieu-thuyet`,
                slug: 'tieu-thuyet'
            },
            {
                code: 1,
                name: 'Truyện tranh',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_183732.jpg',
                link: `/vietnamese-books?cat=truyen-tranh`,
                slug: 'truyen-tranh'
            },
            {
                code: 2,
                name: 'Kinh tế',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_13785.jpg',
                link: `/vietnamese-books?cat=kinh-te`,
                slug: 'kinh-te'
            },
            {
                code: 3,
                name: 'Chính trị',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_90160.jpg',
                link: `/vietnamese-books?cat=chinh-tri`,
                slug: 'chinh-tri'
            },
            {
                code: 4,
                name: 'Tâm lý',
                image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936066692298.jpg',
                link: `/vietnamese-books?cat=tam-ly`,
                slug: 'tam-ly'
            },
            {
                code: 5,
                name: 'Kỹ năng sống',
                image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936067605693.jpg',
                link: `/vietnamese-books?cat=ky-nang-song`,
                slug: 'ky-nang-song'
            },            {
                code: 6,
                name: 'Tình cảm',
                image: 'https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1_tqtp-1-tb.jpg',
                link: `/vietnamese-books?cat=tinh-cam`,
                slug: 'tinh-cam'
            },            {
                code: 7,
                name: 'Khoa học',
                image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8936049631962.jpg',
                link: `/vietnamese-books?cat=khoa-hoc`,
                slug: 'khoa-hoc'
            },
            
        ]
    },
    {
        code: 0,
        name: 'Sách nước ngoài',
        slug: 'foreign-books',
        categories: [
            {
                code: 0,
                name: 'Novels',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_179648.jpg',
                link: '/foreign-books?cat=novels',
                slug: 'novels'
            },
            {
                code: 1,
                name: 'Comics',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_92292.jpg',
                link: '/foreign-books?cat=comics',
                slug: 'comics'
            },
            {
                code: 2,
                name: 'Economy',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_92923.jpg',
                link: '/foreign-books?cat=economy',
                slug: 'economy'
            },
            {
                code: 3,
                name: 'Politics',
                image: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9780374533229.jpg',
                link: '/foreign-books?cat=politics',
                slug: 'politics'
            },
            {
                code: 4,
                name: 'Psychology',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_94772.jpg',
                link: '/foreign-books?cat=psychology',
                slug: 'psychology'
            },
            {
                code: 5,
                name: 'Life-skills',
                image: 'https://cdn0.fahasa.com/media/catalog/product/9/7/9781847941831.jpg',
                link: '/foreign-books?cat=life-skills',
                slug: 'life-skills'
            },            {
                code: 6,
                name: 'Love',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_25731.jpg',
                link: '/foreign-books?cat=love',
                slug: 'love'
            },            
            {
                code: 7,
                name: 'Science',
                image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29958.jpg',
                link: '/foreign-books?cat=science',
                slug: 'science'
            },
            
        ]
    }
]
