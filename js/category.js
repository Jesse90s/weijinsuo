window.addEventListener('load', function () {

    var jd = new JD();
    jd.categoryLeftSwiper();
    jd.categoryRightSwiper();
    jd.categoryLeftClick();

});

// 创建一个构造函数
var JD = function () {

}

JD.prototype = {

    // 分类左侧的滑动效果
    categoryLeftSwiper: function () {
        // 初始化Swiper
        var mySwiper = new Swiper('.category-left .swiper-container', {
            // 垂直方向滑动
            direction: 'vertical',

            // 支持多个子元素一起滑动
            slidesPerView: 'auto',

            // 一次性滑动多个子元素
            freeMode: true,

            // 支持鼠标滚轮
            mousewheel: true,

            // loop: true,

            // 如果需要分页器
            // pagination: {
            //     el: '.swiper-pagination',
            // },

            // 如果需要前进后退按钮
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },

            // 如果需要滚动条
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        })
    },

    // 分类左侧的点击效果
    categoryLeftClick: function () {
        // 1. 给所有的li添加点击事件
        var slideUl = document.querySelector('.category-left .swiper-slide');

        // 2. 给所有li添加一个索引属性
        var list = slideUl.children; 
        for(var i = 0; i < list.length; i++){
            // index就是li的索引的属性
            list[i].index = i;
        }

        // 如果所有的子元素的事件都是一样的，要做的事情也都是一样，就可以给他们的父元素添加，因为js事件可以捕获
        // 虽然是给父元素添加事件，但最终捕获了子元素
        slideUl.addEventListener('click', function (e) {

            // 4. 给所有li删除active类名
            for(var i = 0;i < list.length;i++){
                list[i].classList.remove('active');
            }

            e.target.parentNode.classList.add('active');

            console.log(e);                     //MouseEvent
            console.log(e.target);              //拿到真实触发事件的元素（如果父子元素尺寸一样，就是获取到最里面的元素）
            console.log(e.currentTarget);       //当前添加事件的目标元素
            
            console.log(e.target.parentNode);   //获取到li元素
            
            // 3. 获取当前点击li的高度和索引
            var liHeight = e.target.parentNode.offsetHeight;
            var liIndex = e.target.parentNode.index;


            // 5. 计算当前要位移的距离，注意要带px单位
            var translateY = -liHeight * liIndex;
            console.log(translateY);
            
           
            // 6. 计算最大位移，父元素固定高度-子元素不固定的高度
            var maxTranslateY = document.querySelector('.category-left').offsetHeight - slideUl.offsetHeight;

            console.log(maxTranslateY);
            

            // 7. 判断如果当前位移的距离小于最大位移的距离，就设置为最大的位移距离
            if(translateY < maxTranslateY){
                translateY = maxTranslateY;
            }

            // 8. 把位移距离设置到负责滑动的swiper-wrapper身上
            document.querySelector('.category-left .swiper-wrapper').style.transform = 'translate3d(0px, '+translateY+'px, 0px)';
    
            //9. 吸顶的时候添加过渡的效果
            document.querySelector('.category-left .swiper-wrapper').style.transition = 'all .3s';
        });
    },

    // 分类右侧的滑动效果
    categoryRightSwiper: function () {
        // 初始化Swiper
        var mySwiper = new Swiper('.category-right .swiper-container', {
            // 垂直方向滑动
            direction: 'vertical',

            // 支持多个子元素一起滑动
            slidesPerView: 'auto',

            // 一次性滑动多个子元素
            freeMode: true,

            // 支持鼠标滚轮
            mousewheel: true,

            // 如果需要滚动条
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })

    }
}