export function setCookie(key,value,t)
{
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+t);
    document.cookie=key+"="+value+"; expires="+oDate.toDateString();
} 

export function getCookie(key) {
    var arr1=document.cookie.split(";");
    console.log(document.cookie,'321321321')
    for(var i=0;i<arr1.length;i++){
        var arr2=arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
        if(arr2[0]==key){
        return decodeURI(arr2[1]);
        }
    }
}

export function remove(key) {
    setCookie(key,"",-1);//把cookie设置为过期
}