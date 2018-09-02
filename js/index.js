window.addEventListener('load', function () {

    var jd = new JD();

    jd.searchGradient();
    jd.countDown();
    jd.slider();
})

// 创建一个JD构造函数
var JD = function () {

}

/*
把函数封装到对象里面是为了解决声明多个函数的时候发生全局变量污染

*/

// 给JD构造函数的原型对象添加方法 --> 京东需要用到的方法
JD.prototype = {
    // 每一方法实现了某一功能

    // 顶部搜索框渐变功能
    searchGradient: function () {
        // 1. 给滚动条添加滚动事件
        window.addEventListener('scroll', scrollTopFun);

        //页面一加载进来就无条件执行一次
        scrollTopFun();

        function scrollTopFun() {

            // 2. 获取滚动条滚动的距离
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            console.log(scrollTop);
            // 3. 获取轮播图的高度
            var sliderHeight = document.querySelector('#slider').offsetHeight;
            // 4. 判断当前滚动的距离是否小于轮播图的高度
            if (scrollTop < sliderHeight) {
                // 5. 计算透明度 滚动距离 / 轮播图高度 * 1
                opacity = scrollTop / sliderHeight * 1;
            } else {
                // 6. 滚动的距离大于轮播图高度 默认为1
                opacity = 1;
            }

            // 7. 设置顶部搜索框的样式
            document.querySelector('#header').style.backgroundColor = 'rgba(222, 24, 27,' + opacity + ')';

            document.querySelector('#header').style.boxShadow = '0 3px 14px 2px rgba(0,0,0,' + opacity * 0.3 + ')';

        }
    },

    // 实现倒计时功能
    countDown: function () {

        // new Date如果传参表示获取指定时间 年 月（0-11） 日 时 分 秒 星期（0-6）
        var futureTime = new Date(2019, 07, 30, 13, 55, 00).getTime(); //获取中午12点的毫秒数（未来时间）

        console.log(futureTime);


        // 2.当前时间的毫秒数
        var currentTime = new Date().getTime();

        console.log(currentTime);


        // 3. 使用（未来时间 - 当前时间） / 1000 = 求得倒计时总秒数
        var time = (futureTime - currentTime) / 1000;
        var spanList = document.querySelectorAll('.seckill-time span');

        // 4. 定义一个定时器，每秒执行一次
        var timeId = setInterval(function () {
            // 5. 倒计时总秒数每秒-1
            time--;

            // 判断
            if (time <= 0) {
                time = 0;

                // 到点就清除定时器
                clearInterval(timeId);
            }
            // 6. 计算总秒数的时分秒
            var hour = Math.floor(time / 3600) % 24; //因为总秒数有可能超过1天，为了避免出现25h、26h，所以需要%24取得小时数
            var minute = Math.floor(time / 60) % 60; //先获取总分钟数，再算出小时以外的分钟
            var second = time % 60;

            // 7. 获取页面所有的span，设置时分秒到
            spanList[0].innerHTML = Math.floor(hour / 10);
            spanList[1].innerHTML = hour % 10;

            spanList[3].innerHTML = Math.floor(minute / 10);
            spanList[4].innerHTML = minute % 10;

            spanList[6].innerHTML = Math.floor(second / 10);
            spanList[7].innerHTML = Math.floor(second % 10);
        }, 1000);
    },

    // 实现轮播图功能
    slider: function () {

        // 初始化轮播图
        var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical',
            loop: true,

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 自动播放
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            }

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

    }
}