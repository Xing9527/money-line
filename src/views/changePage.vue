<template>
    <div class="content-change row clear">
        <div class="main-left col-lg-3 col-md-4 col-sm-12">
            <div class="left-top">
                <div class="now-up">
                    <el-row class="up-title">
                        <el-col :span="8">交易对</el-col>
                        <el-col :span="8">实时</el-col>
                        <el-col :span="8">涨幅</el-col>
                    </el-row>
                    <div v-for="(item,index) in jiaoyidui" @click="upType=index+1">
                        <el-row class="up-item"
                                :style="upType==index+1?'border-left: 3px solid #f07e1b;background: rgb(255,246,238)':''">
                            <el-col :span="8">{{item.jiaoyidui}}</el-col>
                            <el-col :span="8">{{item.price | price}}</el-col>
                            <el-col style="color: #f56c6c;" :span="8">{{item.zhangfu | zhangfu}}</el-col>
                        </el-row>
                    </div>
                </div>
                <ul class="up-data">
                    <li>
                        <span>总的发行量数据</span>
                        <span>10000000000</span>
                    </li>
                    <li>
                        <span>底仓储备仓数据</span>
                        <span>{{info1.dicangchubei}}</span>
                    </li>
                    <li>
                        <span>总流通盘数据</span>
                        <span>4000000000</span>
                    </li>
<!--                    <li>-->
<!--                        <span>总储备仓数据</span>-->
<!--                        <span>{{info1.zongchubei}}</span>-->
<!--                    </li>-->
                    <li>
                        <span>抵押储备仓数据</span>
                        <span>{{info1.diyachubei}}</span>
                    </li>
                    <li>
                        <span>当前流通盘数据</span>
                        <span>{{info1.dangqianliutong}}</span>
                    </li>
<!--                    <li>-->
<!--                        <span>CW=</span>-->
<!--                        <span>0.02-2%</span>-->
<!--                    </li>-->
                </ul>
            </div>
            <div class="left-bottom">
                <h5 style="cursor: pointer" @click="$router.push('/noticeList')">公告</h5>
                <p v-for="item in noticeList" :key="item.id" @click="$router.push({path:'/noticeDetail',query:{id:item.id}})">{{item.title}}</p>
            </div>
        </div>
        <div class="main-right col-lg-9 col-md-8 col-sm-12">
            <div class="right-top clear row">
                <div class="col-lg-8 col-md-6 col-sm-12">
                    <div class="bancor">
                        <div class="ban-left">
                            <h5>TITT/USDT</h5>
                            <div class="usd">
                                <p>{{info.top_equal}}</p>
                                <p>≈{{info.top_yequal | price}}</p>
                            </div>
                            <span class="green-num">{{info.top_gain | zhangfu1}}</span>
                        </div>
                        <div class="ban-right">
                            <div>
                                <p>
                                    <span>高</span>
                                    <span>{{info.max}}</span>
                                </p>
                                <p>
                                    <span>低</span>
                                    <span>{{info.min}}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span>今开</span>
                                    <span>{{info.jinkai}}</span>
                                </p>
                                <p>
                                    <span>昨收</span>
                                    <span>{{info.zuoshou}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="echarts" v-loading="loading">
                        <div class="times">
                            <span @click="times='60'" :style="times=='60'?'color:#f07e1b':''">60m</span>
                            <span @click="times='24'" :style="times=='24'?'color:#f07e1b':''">24H</span>
                            <span @click="times='7'" :style="times=='7'?'color:#f07e1b':''">7D</span>
                            <span @click="times='1'" :style="times=='1'?'color:#f07e1b':''">1M</span>
                            <!--<span @click="times='12'" :style="times=='12'?'color:#f07e1b':''">12M</span>-->
                        </div>
                        <div v-if="chartData.time.length != 0">
                            <div id="line" style="height: 300px;"></div>
                            <div id="bar" style="height: 100px;"></div>
                        </div>
                        <div style="text-align:center;position:absolute" v-else>
                            <img style="width:80%;margin:10px auto 0" src="../assets/images/no-echarts.png" alt=""/>
                            <p style="text-align: center">暂无此时间段置换记录</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="buy-recard">
                        <div class="recard-top">
                            <h5>链上买卖记录</h5>
                            <el-row class="buy-title">
                                <el-col :span="6">时间</el-col>
                                <el-col :span="6">买/卖</el-col>
                                <el-col :span="6">数量(EOS)</el-col>
                                <el-col :span="6">TxID</el-col>
                            </el-row>
                        </div>
                        <div class="recard-bottom">
                            <el-row class="recard-item" v-for="(item,index) in recardList" :key="index">
                                <el-col :span="6">{{item.createtime | timeTrans}}</el-col>
                                <el-col :span="6" :style="item.fangxiang=='买入'?'color:#67c23a':'color:#f56c6c'">
                                    {{item.fangxiang}}
                                </el-col>
                                <el-col :span="6">{{item.eos}}</el-col>
                                <el-col :span="6">
                                    <p style="color: #f07e1b;cursor: pointer;font-size: 12px" @click="checkDetail(item.trx_id)">{{item.trx_id | sixLength}}</p>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-middle clear row">
                <div class="col-lg-8 col-md-6 col-sm-12">
                    <el-row>
                        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                            <div class="change-left">
                                <h5>置换TITT</h5>
                                <div style="margin: 25px 0 5px;">
                                    <el-input style="width: 220px;" v-model="tittNum" placeholder="输入想置换的EOS数量"></el-input>
                                    <span style="color: #999;">EOS</span>
                                </div>
                                <p>≈{{titt}}titt</p>
                                <el-button type="success" style="width: 100%;" @click="convert('titt')">置换TITT</el-button>
                                <span class="buy-nums">最小交易值0.05EOS</span>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                            <div class="change-left">
                                <h5>置换EOS</h5>
                                <div style="margin: 25px 0 5px;">
                                    <el-input style="width: 220px;" v-model="eosNum" placeholder="输入想置换的TITT数量"></el-input>
                                    <span style="color: #999;">TITT</span>
                                </div>
                                <p>≈{{eos}}eos</p>
                                <el-button type="danger" style="width: 100%;" @click="convert('eos')">置换EOS</el-button>
                                <span class="buy-nums">最小交易值10TITT</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
<!--                <div class="router-two col-lg-4 col-md-6 col-sm-12">-->
<!--                    <router-link to="/myWallet" class="router-item">-->
<!--                        <img src="../assets/images/qianbao.png" alt=""/>-->
<!--                        <span>我的钱包</span>-->
<!--                    </router-link>-->
<!--                    <a href="https://eospark.com/account/tittbancor14" target="_blank" class="router-item">-->
<!--                        <img src="../assets/images/liulanqi.png" alt=""/>-->
<!--                        <span>区块链浏览器</span>-->
<!--                    </a>-->
<!--                </div>-->
            </div>
            <div class="right-bottom">
                <div class="changer-recard-title clear">
                    <div style="float: left;">
                        <h5>最近一周的置换记录</h5>
                        <!--<p>EOS系统将收取0.5%的手续费</p>-->
                    </div>
                    <span @click="$router.push('/changeList')">查看全部</span>
                </div>
                <div class="change-list">
                    <el-row class="list-title">
                        <el-col :span="4">时间</el-col>
                        <el-col :span="3">交易对</el-col>
                        <el-col :span="3">方向</el-col>
                        <el-col :span="3">成交价格</el-col>
                        <el-col :span="4">成交数量(TITT)</el-col>
                        <el-col :span="4">成交数量(EOS)</el-col>
                        <el-col :span="3">TxID</el-col>
                    </el-row>
                    <el-row class="list-item" v-for="(item,index) in changeList" :key="index">
                        <el-col :span="4">{{item.createtime}}</el-col>
                        <el-col :span="3">{{item.jiaoyidui}}</el-col>
                        <el-col :span="3">{{item.fangxiang}}</el-col>
                        <el-col :span="3" style="color: #f07e1b;">{{item.price}}</el-col>
                        <el-col :span="4">{{item.titt}}</el-col>
                        <el-col :span="4">{{item.eos}}</el-col>
                        <el-col :span="3">
                            <p style="color: #f07e1b;cursor: pointer;font-size: 12px" @click="checkDetail(item.trx_id)">{{item.trx_id | sixLength}}</p>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router/index'
    import echarts from 'echarts'
    export default {
        name: "change",
        data() {
            return {
                upType: 1,
                loading: false,
                jiaoyidui:[],
                recardList: [],
                tittProgress: 0,
                tittNum: '',
                eosProgress: 0,
                eosNum: '',
                eos:'',
                titt:'',
                changeList:[

                ],
                changeShowList:[],
                times:'24',
                chartData:{
                    data:[],
                    time:[1],
                    num:[]
                },
                noticeList:[],
                info:{},
                info1:{},
                min:10000,
                interval:'',
                precent:0.005
            }
        },
        watch: {
            times(val) {
                this.getChartData()
            },
            tittNum(val) {
                if(val) {
                    this.titt = (val/this.precent).toFixed(4);
                }
            },
            eosNum(val) {
                this.eos = (val*this.precent).toFixed(4);
            }
        },
        mounted() {
            this.getChartData();
            this.getWeekList();
            this.getLineList();
            this.getNoticeList();
            this.getChangeInfo();
            this.getChangeInfo1();
            var interval = setInterval(() => {
                this.getChartData('timer')
            },10000);

            router.beforeEach((to,from,next) => {
                if(from.path == '/changePage') {
                    clearInterval(interval)
                }
                next()
            })
        },
        methods: {
            checkDetail(id) {
                console.log(id)
                window.open("https://eospark.com/tx/"+id,'_blank');
            },
            getChangeInfo() {
                this.$axios.get('displace/total').then(res => {
                    if(res.data.sta == 1) {
                        this.info = res.data.data;
                    }
                })
            },
            getChangeInfo1() {
                this.$axios.get('displace/total2').then(res => {
                    if(res.data.sta == 1) {
                        this.info1 = res.data.data;
                    }
                })
            },
            convert(type) {
                if(!sessionStorage.getItem('user')) {
                    this.$message({
                        message: '请先登录！',
                        type: 'info'
                    });
                    this.$router.push('/login')
                    return
                }

                if(type == 'titt') {
                    if(this.tittNum.trim() && this.tittNum >= 0.05) {
                        if(isNaN(this.tittNum)) {
                            alert('请输入数字！');
                            return false;
                        }
                        this.$router.push({path:'/changeSure',query:{titt:this.tittNum,eos:(this.tittNum/200).toFixed(2),fangxiang:false}})
                    }
                }else {
                    if(this.eosNum.trim() && this.eosNum >= 10) {
                        if(isNaN(this.eosNum)) {
                            alert('请输入数字！');
                            return false;
                        }
                        this.$router.push({path:'/changeSure',query:{eos:this.eosNum,titt:(this.tittNum*200).toFixed(2),fangxiang:true}})
                    }
                }
            },
            timestampToTime(timestamp) {
                function add0(m){return m<10?'0'+m:m };
                var time = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();

                if(this.times == '60') {
                    return `${add0(h)}:${add0(mm)}`
                }else if(this.times == '7' || this.times == '24') {
                    return `${add0(h)}:${add0(mm)}\n${add0(m)}/${add0(d)}`
                }else {
                    return `${add0(h)}:${add0(mm)}\n${add0(y)}/${add0(m)}/${add0(d)}`
                }
            },
            getChartData(val) {
                if(!val) {
                    this.loading = true;
                }
                this.$axios.get('displace/echars',{ time:this.times }).then(res => {
                    this.loading = false;
                    if(res.data.sta == 1) {
                        this.chartData.data = res.data.data.price.data;
                        if(res.data.data.price.data) {
                            res.data.data.price.data.forEach(item => {
                                if(this.min>item) {
                                    this.min = item
                                }
                            })
                        }
                        this.chartData.time = [];
                        if(res.data.data.xAxis.data) {
                            res.data.data.xAxis.data.forEach(item => {
                                this.chartData.time.push(this.timestampToTime(item))
                            })
                        }
                        this.chartData.num = res.data.data.titt.data
                        this.$nextTick(() => {
                            this.lineChart();
                            this.barChart();
                        })
                    }else {
                        this.chartData = {
                            data:[],
                            num:[],
                            time:[]
                        }
                    }
                })
            },
            lineChart() {
                var lineChart = echarts.init(document.getElementById('line'));
                lineChart.resize()

                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '2%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.chartData.time,
                        axisLine:{
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '价格',
                        position: 'right',
                        min: this.min - 0.0001,
                        axisLine:{
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                    },
                    series: [
                        {
                            name:'价格',
                            type:'line',
                            data:this.chartData.data,
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(64,158,255,.5)'
                                    }, {
                                        offset: 1,
                                        color: '#fff'
                                    }])
                                }
                            },
                            lineStyle: {
                                color: '#409eff',
                                width: 2
                            },
                            itemStyle: {
                                color: '#409eff',
                                borderWidth: 1
                            }
                        }
                    ]
                };
                lineChart.setOption(option);
            },
            barChart() {
                var barChart = echarts.init(document.getElementById('bar'));
                barChart.resize()
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '3%',
                        top: '-1%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        name: '时间',
                        boundaryGap: false,
                        data: this.chartData.time,
                        axisLine:{
                            show: false,
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: 'titt价格',
                        position: 'right',
                        axisLine:{
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },

                    },
                    series: [
                        {
                            name:'titt成交量',
                            type:'bar',
                            data:this.chartData.num,
                            itemStyle: {
                                color: '#409eff'
                            },
                            barWidth: '5px'
                        }
                    ]
                };
                barChart.setOption(option);
            },
            getWeekList() {
                this.$axios.get('displace/getrecordweek',{type:1,token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data.data) {
                        this.changeList = res.data.data.list;
                    }
                })
            },
            getLineList() {
                this.$axios.get('displace/getrecord',{token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data) {
                        this.recardList = res.data.lianshangjilu;
                        this.jiaoyidui = res.data.jiaoyidui;
                        this.precent = res.data.replacement.titt__eos;
                        console.log(res.data,this.precent);
                    }
                })
            },
            getNoticeList() {
                this.$axios.get('index/gonggao').then(res => {
                    if(res.data.data) {
                        this.noticeList = res.data.data.list.slice(0,4)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content-change {
        clear: both;
        padding: 55px 0 0;
        margin: 0 auto 20px;
        max-width: 1260px;
        .main-left {
            .left-top {
                margin-top: 20px;
                padding: 20px 0 0;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                .now-up {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #e4e7ed;
                    .up-title {
                        margin-bottom: 10px;
                        font-size: 12px;
                        color: #999;
                        text-align: center;
                    }
                    .up-item {
                        border-left: 3px solid #fff;
                        line-height: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #5d6b6e;
                        cursor: pointer;
                    }
                }
                .up-data {
                    padding: 0 15px;
                    li {
                        line-height: 30px;
                        color: #5d6b6e;
                        font-size: 12px;
                        span {
                            &:last-of-type {
                                color: #f07e1b;
                                float: right;
                            }
                        }
                    }
                }
            }
            .left-bottom {
                margin: 20px 0 0;
                padding: 20px 15px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                h5 {
                    font-size: 16px;
                    color: #333;
                    margin: 0 0 10px;
                }
                p {
                    cursor: pointer;
                    line-height: 30px;
                    font-size: 12px;
                    color: #5d6b6e;
                }
            }
        }
        .main-right {
            .right-top {
                .bancor {
                    margin-top: 20px;
                    padding: 20px;
                    overflow: hidden;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                    .ban-left {
                        overflow: hidden;
                        float: left;
                        h5 {
                            float: left;
                            font-size: 32px;
                            color: #666;
                        }
                        .usd {
                            float: left;
                            margin: 0 10px;
                            p {
                                color: #333;
                                &:first-of-type {
                                    margin-bottom: 5px;
                                    font-size: 32px;
                                    font-weight: 500;
                                }
                                &:last-of-type {
                                    font-size: 18px;
                                }
                            }
                        }
                        .green-num {
                            float: left;
                            margin-top: 5px;
                            max-width: 98px;
                            line-height: 40px;
                            color: #fff;
                            border-radius: 4px;
                            background: #67c23a;
                            text-align: center;
                        }
                    }
                    .ban-right {
                        float: left;
                        p {
                            float: left;
                            color: #666;
                            font-size: 12px;
                            &:first-of-type {
                                margin-right: 40px;
                            }
                            span {
                                display: inline-block;
                                &:first-of-type {
                                    width: 30px;
                                    text-align: left;
                                }
                                &:last-of-type {
                                    width: 40px;
                                    text-align: right;
                                    color: #f07e1b;
                                }
                            }
                        }
                    }
                }
                .echarts {
                    position: relative;
                    padding-top: 20px;
                    margin-top: 20px;
                    height: 445px;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                    .times {
                        margin-left: 20px;
                        font-size: 12px;
                        color: #5b6d6e;
                        span {
                            display: inline-block;
                            cursor: pointer;
                            margin-right: 15px;
                        }
                    }
                }
                .buy-recard {
                    margin-top: 20px;
                    padding: 10px 0;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                    .recard-top {
                        padding-bottom: 20px;
                        border-bottom: 1px solid #e4e7ed;
                        h5 {
                            margin: 10px 0 20px 20px;
                            font-size: 16px;
                            color: #333;
                        }
                        .buy-title {
                            font-size: 12px;
                            color: #999;
                            text-align: center;
                        }
                    }
                    .recard-bottom {
                        padding: 10px 0 0;
                        font-size: 12px;
                        color: #5d6b6e;
                        text-align: center;
                        .recard-item {
                            line-height: 30px;
                        }
                    }
                }
            }
            .right-middle {
                .change-left {
                    float: left;
                    margin-top: 20px;
                    padding: 15px 18px 8px;
                    width: 100%;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                    h5 {
                        margin-bottom: 15px;
                        font-size: 16px;
                        color: #333;
                    }
                    p {
                        font-size: 12px;
                        color: #5d6b6e;
                        span {
                            font-weight: 600;
                            color: #67c23a;
                            font-size: 14px;
                        }
                    }
                    .buy-nums {
                        margin: 13px 0;
                        display: block;
                        font-size: 12px;
                        color: #f00;
                        text-align: center;
                    }
                }
                .router-two {
                    margin-top: 20px;
                    .router-item {
                        display: block;
                        padding: 25px 36px;
                        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                        &:last-of-type {
                            margin-top: 12px;
                        }
                        img {
                            margin-right: 25px;
                            width: 56px;
                            height: 56px;
                        }
                        span {
                            font-size: 18px;
                            color: #409eff;
                            font-weight: 700;
                        }
                    }
                }
            }
            .right-bottom {
                margin-top: 20px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                .changer-recard-title {
                    padding: 20px 20px 10px;
                    border-bottom: 1px solid #e4e7ed;
                    h5 {
                        margin: 0;
                        font-size: 16px;
                        color: #333;
                    }
                    p {
                        font-size: 12px;
                        color: #999;
                    }
                    span {
                        float: right;
                        font-size: 14px;
                        color: #f07e1b;
                        cursor: pointer;
                    }
                }
                .change-list {
                    padding: 10px 20px;
                    word-wrap: break-word;
                    .list-title {
                        margin: 10px 0;
                        text-align: center;
                        color: #999;
                        font-size: 12px;
                    }
                    .list-item {
                        font-size: 12px;
                        color: #5d6b6e;
                        text-align: center;
                        margin: 8px 0;
                    }
                }
            }
        }
    }
</style>
