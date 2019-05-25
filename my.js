/*
*精简版jQuery
*param(str) 字符串(".elementClassName","#elementIdName","elementTagName")
*/
function $(str) {
    var elArr = null;
    if (str[0] === ".") {
        // str.slice()提取从下标为1开始的所有字符,到最后
        elArr = document.getElementsByClassName(str.slice(1));
        if (elArr.length > 1) {
            return elArr;
        }else{
            return elArr[0];
        };
    }else if(str[0] === "#"){
        return document.getElementById(str.slice(1));
    }else{
        elArr = document.getElementsByTagName(str);
        if (elArr.length > 1) {
            return elArr;
        }else{
            return elArr[0];
        };
    }
}
/*
*匀速运动函数
*param ele 运动的元素
*param target 运动的终点
*/
function average(ele,target) {
    var start,step,cha;
    clearInterval(ele.timer);
    ele.timer = setInterval(function() {
        //起点
        start = ele.offsetLeft;//返回的是整数
        //步长
        step = target > start ? 10 : -10;
        //差值
        cha = target - start;
        //判断终点的临界值
        if (Math.abs(cha) < Math.abs(step)) {
            ele.style.left = target +"px";
            clearInterval(ele.timer);
        }else{
            ele.style.left = start + step + "px"
        }
    },17)
}
/*
*缓动动画
* @param ele 运动的元素
* @param target 运动的终点
*/
function slowly(ele,target) {
    var start,step;
    clearInterval(ele.timer);
    ele.timer = setInterval(function() {
        //起点
        start = ele.offsetLeft;
        //步长(可能是往回走)
        step = (target - start) / 10;
        //判断运动临界值
        if (Math.abs(step) < 1) {
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
        }
        //清除定时器条件
        if (target === start +step) {
            clearInterval(ele.timer);
        }
        //运动
        ele.style.left = start + step + "px";
    }, 17);
}
/*
*多样式缓动动画
* @param ele 运动的元素
* @param targetObj 多样式的终点(width,height,left,top,zIndex,opacity)
*/
function mulStyle(ele,targetObj) {
    var start,step,target;
    clearInterval(ele.timer);
    ele.timer = setInterval(function(){
        //假设全部样式走到终点,true
        var status = true;
        //遍历目标对象
        for (var i in targetObj) {
            //判断是不是层级样式
            if (i === "zIndex") {
                ele.style.left = target[i];
            }
            //判断是不是透明度样式
            if (i === "opacity") {
                //起点
                start = parseInt(getStyle(ele,i)) * 100;
                //终点
                target = targetObj[i] * 100;
            }else{
                start = parseInt(getStyle(ele,i));
                target = targetObj[i];
            }
            //步长
            step = (target - start) / 10;
            //判断运动的临界值
            if (Math.abs(step) < 1) {
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
            }
            //判断全部样式是否都到达终点
            if (target !== start + step) {
                status = false;
            }
            if (i === "opacity") {
                ele.style.opacity = (start + step) / 100;
            }else{
                ele.style[i] = start + step + "px";
            }
        }
        //清除定时器条件
        if (status) {
            clearInterval(ele.timer);
        }
    },17)
}
/*
*获取元素内联或者外联样式值
* @param ele 目标元素
* @param styleName 要获取的样式名
*/
function getStyle(ele,styleName) {
    if (ele.currentStyle) {
        return ele.currentStyle[styleName];
    }else{
        return window.getComputedStyle(ele,null)[styleName];
    }
}
/*
*添加类名
* @param ele 目标元素
* @param className 要添加的类名
*/
function addClass(ele,className) {
    //获取旧类名
    var old = ele.getAttribute('class');
    //判断是否存在旧类名
    if (old) {
        //判断旧类名中是否存在要添加的新类名
        if (old.indexOf(className) === -1) {
            //把新类名添加到旧类名中
            old = old + " " + className;
            //添加类名
            ele.setAttribute('class',old);
        }
    }else{
        ele.setAttribute('class',className);
    }
}
/*
*添加多个类名
* @param ele 目标元素
* @param 不限参 要添加的类名
*/
function mulAdd(ele) {
    //arguments 实参的集合[ele,'class','class']
    //获取旧类名
    var old = ele.getAttribute('class');
    if (old) {
        for (var i = 1; i < arguments.length; i++) {
            if (old.indexOf(arguments[i]) === -1) {
                old = old + " " + arguments[i];
            }else{
                continue;
            }
        }
        ele.setAttribute('class',old);
    }else{
        var str = "";
        for (var i = 1; i < arguments.length; i++) {
            str = arguments[i] + " ";
        }
        ele.setAttribute('class',str);
    }
}
/*
*删除单个类名
* @param ele 目标元素
* @param className 要删除的类名
*/
function delClass(ele,className) {
    var old = ele.getAttribute('class');
    if (old) {
        //转换成数组
        var arr = old.split(' ');
        //判断在数组中是否存在
        if (arr.indexOf(className) !== -1) {
            //删除,splice删除;slice提取/截取
            arr.splice(arr.indexOf(className),1);
            ele.setAttribute('class',arr.join(" "));
        }
    }
}
/*
*删除多个类名
* @param ele 目标元素
* @param 不限参 要删除的类名
*/
function removeClass(ele) {
    var old = ele.getAttribute('class');
    if(old){
        var arr = old.split(' ');
        for (var i = 1; i < arguments.length; i++) {
            if(arr.indexOf(arguments[i] !== -1)){
                arr.splice(arr.indexOf(arguments[i]),1);
            }else{
                continue;
            }
        }
        ele.setAttribute('class',arr.join(" "));
    }
}
/*
* 获取页面卷入的高度
*/
function scrollTop() {
    return document.documentElement.scrollTop || document.pageYOffset || document.body.offsetTop;
}
/*
* 获取页面卷入的左边距
*/
function scrollLeft() {
    return document.documentElement.scrollLeft || document.pageXOffset || document.body.scrollLeft;
}
/*
* 冒泡函数
*/
// for (var j = 0; j < array.length; j++) {
//     for (var i = 0; i < array.length -j; i++) {
//         if (array[i] > array[i+1]) {
//             var temp = array[i+1];
//             array[i+1] = array[i];
//             array[i] = temp;
//         }  
//     } 
// }
/*
* 选择排序
*/
//假设最小值的下表为0
// for (var j = 0; j < array.length; j++) {
//     var minIndex = j;
//     for (var i = j; i < array.length -j; i++) {
//         if (array[minIndex] > array[i]) {
//             //保证minIndex是最小值的下标
//             minIndex = i;
//         }
//     }
//     //判断最小值是不是默认的j,不是交换,是无需交换
//     if (minIndex !== j) {
//         var temp = arr[j];
//         array[j] = array[minIndex];
//         array[minIndex] = temp;
//     }
// }

/*
* 递归函数
* 寻找规律 n! = (n-1)!*n,不死神兔 n = (n-1) + (n-2)
*/
function fn(n) {
    // 判断终止值
    if (n === 1) {
        return 1;
    }
    return fn(n-1) * n;
}
