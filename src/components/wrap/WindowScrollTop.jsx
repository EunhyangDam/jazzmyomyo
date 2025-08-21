import React from 'react';
import { useLocation } from 'react-router-dom';

export default function WindowScrollTop(props) {

    const location = useLocation();

    //스크롤 탑값을 맨위로 이동
    React.useEffect(()=>{
    window.scrollTo({top:0, left:0, behavior:'smooth'});

    }, [location.key])

    
    return null;
}