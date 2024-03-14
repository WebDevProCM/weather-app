export const weatherCode = (code) =>{
    if(code=== 0){
        return "sunny";
    }else if(code>0 && code < 58){
        return "cloudy";
    }else if(code> 60 && code < 68){
        return "rainy";
    }else if(code > 70 && code < 83 ){
        return "snow";
    }else if(code> 94 && code < 100){
        return "storm";
    }else{
        return "sunny";
    }
}