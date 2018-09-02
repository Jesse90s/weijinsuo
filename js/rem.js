window.addEventListener('resize', setHtmlFontSize);

// 页面一进来就无条件执行一次
setHtmlFontSize();

// 根据屏幕宽度改变根元素html的字体大小
function setHtmlFontSize() {
    /* 
    当前屏幕宽度 / 标准的375屏宽度（求得你当前屏幕是标准屏幕的多少倍） * 标准屏幕根元素html的字体大小
    */
    // 1. 获取当前屏幕宽度
    var windowWidth = document.documentElement.offsetWidth;

    // 限制最大屏幕和最小屏幕
    if (windowWidth > 750) {
        windowWidth = 750;
    } else if (windowWidth < 320) {
        windowWidth = 320;
    }

    // 2. 设置标准屏幕的宽度
    var standardWidth = 375;

    // 3. 设置标准屏幕根元素html的字体大小
    var standardHtmlFontSize = 100;

    // 4. 计算出当前尺寸屏幕需要设置的根元素的字体大小
    var htmlFontSize = windowWidth / standardWidth * standardHtmlFontSize;
    console.log(htmlFontSize);


    // 5. 把计算得到的字体大小设置到页面html元素上
    document.querySelector('html').style.fontSize = htmlFontSize + 'px';

}