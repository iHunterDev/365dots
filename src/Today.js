Today = {
    data: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        year_sum: 0,
        today_sum: 0,
        per: 0,
        click_func: function(){console.dir('打印自己的DOM对象：');console.dir(this)}
    },
    config: {
        zero: false, // 三个选项: false=不转换；m=仅月份转；d=仅天数转；full=全部都转
    },
    init: function (ele) {
        this.data.year_sum = this.getDayNum()
        this.data.today_sum = this.getDayNum(this.data.month)
        this.data.per = Math.floor(this.data.today_sum / this.data.year_sum * 100) + '%'

        this.createLayout(ele)

        console.log("%c wzblog(惜梦) %c http://github.com/wzblog and https://blog.wz52.cn/project.html", "color: #fff; background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;", "background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 255, 255) 100%); padding:5px 0;");
    },
    createLayout: function (ele) {
        // 创建容器
        var container = $('<div></div>').addClass('container_today')

        // 创建头部
        var header = $('<div></div>').addClass('header_today')

        // 创建年份
        var year = $('<div></div>').addClass('year_today')

        // 创建进度
        var per = $('<div></div>').addClass('per_today')

        // 创建天数详情
        var detail = $('<div></div>').addClass('detail_today')

        // 创建天数盒子
        var dots = $('<div></div>').addClass('dots_today')


        // 组合布局
        // 插入头部
        year.html(this.data.year)
        header.append(year)

        per.html(this.data.per)
        header.append(per)

        detail.html(this.data.today_sum + '/' + this.data.year_sum)
        header.append(detail)

        container.append(header)

        // 插入点
        
        for (var m = 1; m <= 12; m++) {
            var monthDay = new Date(2019, m, 0).getDate()

            for (var d = 1; d <= monthDay; d++) {

                var dot

                if (m <= (this.data.month + 1) || (m == (this.data.month + 1) && d <= this.data.month)) {
                    dot = this.createDot(m, d, true)

                    if (m == (this.data.month + 1) && d == this.data.day) {
                        dot.addClass('lamp_today')
                    }
                } else {
                    dot = this.createDot(m, d)
                }

                dots.append(dot)
            
            }

        }

        container.append(dots)

        // 插入容器
        $(ele).append(container)
    },
    // 创建点
    createDot: function (month, day, mark) {
        var dot = $('<a></a>').addClass('dot_today')

        if (mark === true) {
            dot.addClass('active_today')
        }

        // 添加年月日属性，方便二次开发的需要
        dot.attr('data-year', this.data.year)
        dot.attr('data-month', month)
        dot.attr('data-day', day)

        // 添加由年月日组成的id，方便二次开发获取熟悉 格式为：time_ + 年月日 最终结果: time_20190630

        // 给月和日补零，保证所有数字都在两位数
        // 设置一个开关根据不同需要来设置
        switch(this.config.zero)
        {
            case 'm':
                if (month < 10) {
                    month = '0' + month
                }
                break;
            case 'd':
                if (day < 10) {
                    day = '0' + day
                }
                break;
            case 'full':
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                break;
        }

        // 给dot天加上id给二次开发用于操作
        dot.attr('id', 'time_' + this.data.year + month + day)

        // 给dot添加点击回调
        dot.click(this.data.click_func)

        return dot
    },
    // 获取全年天数
    getDayNum: function (month) {

        // 如果为设置月份则默认获取全年的天数
        if (! month) month = 12

        var days = 0
        for (var i = 1; i <= month; i++) {
            var d = new Date(this.data.year, i, 0)
            days += d.getDate()
        }

        // 如果不是获取全年的则加上当月已过天数, 原因是因为js获取到的月份是以 0 开始代表一月, 所以上面for循环只会计算到上一个月的天数
        if (month != 12) days += this.data.day

        return days
    }
}