<template>
    <div class="center">
        <div class="row">
            <div class="left col-lg-5 col-md-5 col-sm-12">
                <div class="info">
                    <div class="row">
                        <div class="info-left col-lg-4 col-md-4 col-sm-12">
                            <img style="width: 72px;height:72px;" src="../assets/images/center-header.jpg" alt=""/>
                            <p class="phone">{{userName}}</p>
                            <span class="kyc" @click="routerPush('/kyc1')">
                                <img v-if="info.kyc1 == 1" src="../assets/images/kyc1.png" alt=""/>
                                <img v-else src="../assets/images/kyc2.png" alt=""/>
                                <span>KYC1认证</span>
                            </span>
                            <span class="kyc" @click="routerPush('/kyc2')">
                                <img v-if="info.kyc2 == 1" src="../assets/images/kyc1.png" alt=""/>
                                <img v-else src="../assets/images/kyc2.png" alt=""/>
                                <span>KYC2认证</span>
                            </span>
                        </div>
                        <div class="info-right col-lg-8 col-md-8 col-sm-12">
                            <div style="text-align: left;">
                                <el-button type="primary" size="small" style="margin:0 10px 10px 0" @click='friendHonggu'>申请领取好友助力{{info.friendHongGu}}红股</el-button>
                                <el-button type="primary" size="small" style="margin:0 0 10px" @click='qiandao' v-if="info.qiandaoStatus==2">签到送10红股</el-button>
                                <el-button type="info" size="small" v-else>已签到</el-button>
                            </div>
                            <p>TITT数量</p>
                            <h5>{{info.titt}}</h5>
                            <el-button size="small" type="primary" v-if="info.is_zhiyuanzhe == 2" plain style="margin:10px 10px 0 0;" @click="routerPush('/volunteerApply')">申请志愿者</el-button>
                            <el-button size="small" type="info" v-else plain style="margin: 10px 10px 0 0;">申请志愿者</el-button>
                            <el-button size="small" type="info" plain style="margin: 10px 0 0 0;" @click="copyVisiteCode(3)" class="copy3" :data-clipboard-text="copyTuiguangma">复制志愿者推广邀请码</el-button>
                        </div>
                    </div>
                </div>
                <div class="honggu">
                    <div class="left">
                        <p>已解锁红股数量</p>
                        <p>{{info.hongguyijiesuo}}</p>
                    </div>
                    <el-button class="btn1" size="small" @click="routerPush('/hongguChange')">兑换TITT</el-button>
                    <div class="right">
                        <p>未解锁红股数量</p>
                        <p>{{info.hongguweijiesuo}}</p>
                    </div>
                    <el-button class="btn2" type="primary" size="small" @click="routerPush('/hongguCode')">红股兑换码</el-button>
                </div>
                <div class="award-record" style="overflow: hidden">
                    <h5>TITT总量：{{info.titt}}TITT</h5>
                    <el-row class="award-title">
                        <el-col :span="10">日期</el-col>
                        <el-col :span="7">持仓TITT数量</el-col>
                        <el-col :span="7">持仓交易明细</el-col>
                    </el-row>
                    <el-row class="award-item" style="line-height: 40px;" v-for="(item,index) in chicangList" :key="index">
                        <el-col :span="10">{{item.createdtime}}</el-col>
                        <el-col :span="7" style="color: #f07e1b;">{{item.tittnum}}</el-col>
                        <el-col :span="7" style="color: #f07e1b;">
                            <el-button type="text" @click="$router.push({ path:'/chicangDetail',query:{ id:item.id } })">详情</el-button>
                        </el-col>
                    </el-row>
                    <el-button type="text" style="float: right;margin-right: 30px;" @click="routerPush('/chicangList')">更多持仓交易明细>></el-button>
                </div>
                <div class="invite">
                    <el-row class="row">
                        <el-col :span="8" class="friend">
                            <span>志愿者获得奖励</span>
                            <span>{{num4}}</span>
                        </el-col>
                        <el-col :span="8" class="friend">
                            <span>直接邀请志愿者数量</span>
                            <span>{{num2}}</span>
                        </el-col>
                        <el-col :span="8" class="friend">
                            <span>下线志愿者数量</span>
                            <span>{{num3}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="invite">
                    <el-row class="row">
                        <el-col :span="8" class="friend">
                            <span>获得邀请奖励</span>
                            <span>{{num1}}</span>
                        </el-col>
                        <el-col :span="8" class="friend">
                            <span>直接好友数量</span>
                            <span>{{num5}}</span>
                        </el-col>
                        <el-col :span="8" class="friend">
                            <span>好友邀请的好友数量</span>
                            <span>{{num6}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="invite-code" style="margin-top: 30px;">
                        <el-col :span="6">我的邀请码</el-col>
                        <el-col :span="14">{{copyValue}}</el-col>
                        <el-col :span="4">
                            <el-button size="small" type="primary" class="copy1" plain style="padding: 6px 12px;" :data-clipboard-text="copyValue" @click="copyVisiteCode(1)">复制</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="invite-code">
                        <el-col :span="6">我的邀请链接</el-col>
                        <el-col :span="14" style="word-wrap: break-word">http://fortunechain.one/register?i={{copyValue}}
                        </el-col>
                        <el-col :span="4">
                            <el-button size="small" type="primary" class="copy2" plain style="padding: 6px 12px;" :data-clipboard-text="'http://fortunechain.one/register?i=' + copyValue"
                                       @click="copyVisiteCode(2)">复制
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="award-record">
                    <h5>获得奖励记录</h5>
                    <el-row class="award-title">
                        <el-col :span="10">时间</el-col>
                        <el-col :span="7">奖励来源</el-col>
                        <el-col :span="7">通证奖励数额</el-col>
                    </el-row>
                    <el-row class="award-item" v-for="(item,index) in awardList" :key="index">
                        <el-col :span="10">{{item.createtime}}</el-col>
                        <el-col :span="7" style="color: #f07e1b;">{{item.laiyuan}}</el-col>
                        <el-col :span="7" style="color: #f07e1b;">{{item.titt}}</el-col>
                    </el-row>
                    <div class="block">
                        <el-pagination
                                :page-size="10"
                                :pager-count="5"
                                layout="prev, pager, next"
                                :total="recordTotal"
                                @current-change="recordCurrentChange">
                        </el-pagination>
                    </div>
                </div>
                <div class="award-news">
                    <h5>奖励政策</h5>
                    <div class="news-item">
                        <p v-for="(item,index) in newsList" :key="index" @click="$router.push({path:'/awardDetail',query:{data:JSON.stringify(item)}})">{{index+1}}、{{item.title}}</p>
                    </div>
                </div>
                <div class="rules">
                    <h5>通证领取活动细则</h5>
                    <div class="item">
                        <p>1、活动期间，注册新账号即可获得注册奖励，后续将根据实际情况进行调整。</p>
                        <p>2、好友通过你的邀请码、专属邀请链接、专属邀请二维码注册成功后，你的通证账户即刻获得邀请奖励；三种方式中的任意方式均可。</p>
                        <p>3、通证保留随时对这侧领取TITT、邀请奖励TITT活动规则进行调整的权力，但是对你推荐的好友数量没有限制。</p>
                        <p>4、通证会严查重复的或者虚假的账号，一经发现，将不会对注册及邀请进行奖励。</p>
                    </div>
                </div>
            </div>
            <div class="right col-lg-7 col-md-7 col-sm-12">
                <div class="bledge-container">
                    <h4>抵押活动信息</h4>
                    <div class="pledge">
                        <div class="pledge-top clear">
                            <div class="all-pledge">
                                <p>总抵押数量</p>
                                <span>{{info.diyaNum}}</span>
                            </div>
                            <h5>可参加抵押活动</h5>
                            <p style="margin: 20px 0;">个人抵押</p>
                            <el-button v-for="(item,index) in personList" :key="item.createtime" type="primary" style="margin:0px 30px 20px 0" size="small" @click="goDiya(item)">{{item.time1 | timeTrans}}{{item.title}}【<span v-if="item.type==2">企业抵押</span><span v-else>个人抵押</span>】</el-button>
                            <p style="margin: 20px 0;">企业抵押</p>
                            <el-button v-for="(item,index) in companyList" :key="item.createtime" type="primary" style="margin:0px 30px 20px 0" size="small" @click="goDiya(item)">{{item.time1 | timeTrans}}{{item.title}}【<span v-if="item.type==2">企业抵押</span><span v-else>个人抵押</span>】</el-button>
                            <h5>已参加抵押活动</h5>
                        </div>
                        <div class="pledge-item"  v-for="(item,index) in doneHuodong" :key=index>
                            <h5>财富链首期抵押分红活动</h5>
                            <div class="bledge-content row">
                                <div class="item-left col-lg-4 col-md-4 col-sm-12">
                                    <div class="fang">
                                        <p>预期分红</p>
                                        <span>{{item.fenhong}}</span>
                                    </div>
                                    <p class="time">到期日：{{item.endtime}}</p>
                                </div>
                                <div class="item-right col-lg-8 col-md-8 col-sm-12">
                                    <el-row class="right-row">
                                        <el-col :span="7">已抵押TITT数量</el-col>
                                        <el-col :span="17">{{item.num}}（个）</el-col>
                                    </el-row>
                                    <el-row class="right-row">
                                        <el-col :span="7">抵押时间周期</el-col>
                                        <el-col :span="17" style="padding-left: 5px;">{{item.diyatimezhouqi}}</el-col>
                                    </el-row>
                                    <el-row class="right-row">
                                        <el-col :span="7">解锁条件</el-col>
                                        <el-col :span="17" style="padding-left: 5px;">{{item.jiesuotiaojian}}</el-col>
                                    </el-row>
<!--                                    <el-row class="right-row">-->
<!--                                        <el-col :span="7">抵押分红时间</el-col>-->
<!--                                        <el-col :span="17" style="padding-left: 5px;">{{diyafenhongshijian}}</el-col>-->
<!--                                    </el-row>-->
                                    <el-row class="right-row">
                                        <el-col :span="7">预期分红数量</el-col>
                                        <el-col :span="17" style="padding-left: 5px;">{{item.yuqifenhongliang}}（个）</el-col>
                                    </el-row>
                                    <el-row class="right-row">
                                        <el-col :span="7">抵押分红解锁</el-col>
                                        <el-col :span="17" style="padding-left: 5px;">{{item.diyafenhongjiesuo}}</el-col>
                                    </el-row>
                                    <el-row class="right-row">
                                        <el-col :span="7">活动状态</el-col>
                                        <el-col :span="17" style="padding-left: 5px;"><span v-if="item.endStatus == 2">已结束</span><span v-else>未结束</span></el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div class="block">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="page3"
                                    layout="total, prev, pager, next, jumper"
                                    :total="total3">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'
    export default {
        name: "person-center",
        data() {
            return {
                awardList: [],
                userName:'',
                titt:'',
                num1:0,
                num2:0,
                num3:0,
                num4:0,
                num5:0,
                num6:0,
                newsList: [],
                copyValue:'',
                copyTuiguangma:'',
                page1:1,
                page3:1,
                recordTotal:0,
                nums:{},
                diyaTotal:0,
                personList:[],
                companyList:[],
                doneHuodong:[],
                total3:0,
                chicangList:[],
                hongguyijiesuo:'',
                hongguweijiesuo:'',
                info:{}
            }
        },
        mounted() {
            this.getInfo();
            this.getNewsList();
            this.getAwardList();
            this.getNums();
            this.getDiya();
            this.getDoneDiya();
            this.getChicang();
            var str = JSON.parse(sessionStorage.getItem('user'));//获取邀请码
            this.copyValue = str.yaoqingma;
            this.copyTuiguangma = str.tuiguangma;
            this.userName = str.username;
            this.titt = str.titt;
            this.hongguyijiesuo = str.hongguyijiesuo;
            this.hongguweijiesuo = str.hongguweijiesuo;
        },
        methods: {
            getInfo() {
                this.$axios.get('user/userinfo',{token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    this.info = res.data;
                })
            },
            checkLogin() {
                if(!sessionStorage.getItem('user')) {
                    this.$message({
                        message: '请先登录！',
                        error: 'info'
                    });
                    this.$router.push('/login');
                    return false
                }else {
                    return true
                }
            },
            routerPush(url) {
                if(this.checkLogin()) {
                    if(url == '/hongguChange') {
                        this.$router.push({path:url,query:{hongguweijiesuo:this.info.hongguweijiesuo}})
                    }else {
                        this.$router.push(url)
                    }
                };
            },
            getChicang() {
                this.$axios.get('user/chicang',{token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data.sta == 1) {
                        this.chicangList = res.data.data;
                    }
                })
            },
            goDiya(val) {
                if(val.type == 2) {
                    this.$router.push({path:'/companyApply',query:{detail:JSON.stringify(val)}})
                }else {
                    this.$router.push({path:'/personApply',query:{detail:JSON.stringify(val)}})
                }
            },
            copyVisiteCode(val) {
                if(this.info.is_zhiyuanzhe == 2) {
                    this.$message.error('请先申请志愿者，通过后才可复制！');
                    return
                }
                if(!this.checkLogin()) {
                    return false
                };
                if(val == 1) {
                    var clipboard = new Clipboard('.copy1');

                }else if(val == 2){
                    var clipboard = new Clipboard('.copy2');
                }else {
                    var clipboard = new Clipboard('.copy3');
                }
                var that = this;
                clipboard.on('success', function(e) {
                    that.$message({
                        message: '复制成功！',
                        type: 'success'
                    });
                    e.clearSelection();
                    clipboard.on('error', function(e) {
                        that.$message.error('复制失败！');
                    });
                });
            },
            recordCurrentChange(page) {
                this.page1 = page;
                this.getAwardList()
            },
            diyaCurrentChange(page) {
                this.page2  = page;
                this.getDiya()
            },
            handleCurrentChange(page) {
                this.page3 = page;
                this.getDoneDiya()
            },
            getNewsList() {
                this.$axios.get('index/jiangli').then(res => {
                    if(res.data.data) {
                        this.newsList = res.data.data
                    }
                })
            },
            getAwardList() {
                this.$axios.get('user/jianglijilu',{p:this.page1,token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data.data) {
                        this.awardList = res.data.data.list;
                        this.recordTotal = res.data.data.totalPage;
                    }
                })
            },
            getNums() {
                this.$axios.get('user/getnum',{type:1,token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data) {
                        this.num1 = res.data.data1
                        this.num2 = res.data.data5
                        this.num3 = res.data.data6
                        this.num4 = res.data.data4
                        this.num5 = res.data.data2
                        this.num6 = res.data.data3                        
                    }
                })
            },
            getDiya() {
                this.$axios.get('user/huodonglist',{p:this.page2,token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data.data) {
                        if(res.data.data.list && res.data.data.list.length != 0) {
                            this.personList = res.data.data.list.filter(item => item.type == 1)
                            this.companyList = res.data.data.list.filter(item => item.type == 2)
                        }
                    }
                })
            },
            getDoneDiya() {
                this.$axios.get('user/myhuodong',{p:this.page3,token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        sessionStorage.removeItem('user')
                        sessionStorage.removeItem('token')
                        return
                    }
                    if(res.data) {
                        this.doneHuodong = res.data.list;
                        this.total3 = res.data.totalPage
                    }
                })
            },
            friendHonggu() {
                this.$axios.post('user/apply_bonus_shares',{token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        this.$message.error("请重新登录！");
                        this.$router.push('/login')
                    }
                    if(res.data.sta == 1) {
                        this.$message({
                            message: '申请成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            qiandao() {
                this.$axios.post('user/qiandao',{token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        this.$message.error("请重新登录！");
                        this.$router.push('/login')
                    }
                    if(res.data.sta == 1) {
                        this.info.qiandaoStatus = 1;
                        this.$message({
                            message: '签到成功！',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .center {
        padding-top: 56px;
        max-width: 1260px;
        margin: 0 auto;
        .left {
            margin: 20px 0;
            .info {
                padding: 0 20px 20px;
                border-radius: 3px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                .info-left {
                    margin-top: 20px;
                    text-align: center;
                    .phone {
                        font-size: 16px;
                        font-weight: 700;
                        color: #606266;
                    }
                    .kyc {
                        position: relative;
                        cursor: pointer;
                        span {
                            position: absolute;
                            width: 30px;
                            left: 7px;
                            top: -1px;
                            font-size: 10px;
                            color: #fefffe;
                            line-height: 12px;
                        }
                    }
                }
                .info-right {
                    margin-top: 20px;
                    p {
                        font-size: 12px;
                        color: #606266;
                    }
                    h5 {
                        font-size: 36px;
                        color: #f07e1b;
                    }
                }
            }
            .honggu {
                overflow: hidden;
                margin-top: 20px;
                padding: 30px 20px 20px;
                border-radius: 3px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                .left {
                    float: left;
                    p {
                        &:last-of-type {
                            font-size: 36px;
                            font-weight: 700;
                            color: #f07e1b;
                        }
                    }
                }
                .btn1 {
                    float: left;
                    margin: 25px 10px 0;
                }
                .right {
                    float: left;
                    p {
                        &:last-of-type {
                            font-size: 36px;
                            font-weight: 700;
                            color: #f07e1b;
                        }
                    }
                }
                .btn2 {
                    float: right;
                }
            }
            .invite {
                margin-top: 20px;
                padding: 30px 20px 20px;
                border-radius: 3px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                .friend {
                    text-align: center;
                    border-right: 1px solid #ddd;
                    &:last-of-type {
                        border-right: none;
                    }
                    &:first-of-type {
                        span {
                            &:last-of-type {
                                color: #f07e1b;
                            }
                        }
                    }
                    span {
                        display: block;
                        &:first-of-type {
                            color: #999;
                            font-size: 12px;
                        }
                        &:last-of-type {
                            color: #606266;
                            font-size: 36px;
                            margin-top: 10px;
                            font-weight: 700;
                        }
                    }
                }
                .invite-code {
                    margin-top: 10px;
                }
            }
            .award-record {
                padding: 20px 0;
                margin-top: 20px;
                border-radius: 3px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                h5 {
                    padding-left: 20px;
                    font-size: 16px;
                    color: #333;
                }
                .award-title {
                    text-align: center;
                    font-size: 14px;
                    color: #999;
                    margin-top: 25px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #ddd;
                }
                .award-item {
                    margin-top: 15px;
                    font-size: 14px;
                    color: #5d6b6e;
                    text-align: center;
                }
                .block {
                    margin: 20px 20px 0 0;
                    text-align: right;
                }
            }
            .award-news {
                padding: 20px;
                margin-top: 20px;
                border-radius: 3px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                h5 {
                    font-size: 16px;
                    color: #333;
                }
                .news-item {
                    margin: 20px 0 10px;
                    p {
                        font-size: 14px;
                        color: #909399;
                        line-height: 30px;
                        cursor: pointer;
                    }
                }
                .block {
                    text-align: right;
                }
            }
            .rules {
                padding: 20px;
                margin-top: 20px;
                border-radius: 3px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                h5 {
                    font-size: 16px;
                    color: #333;
                }
                .item {
                    margin-top: 20px;
                }
            }
        }
        .right {
            margin: 20px 0;
            .bledge-container {
                padding: 20px 0;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                border-radius: 3px;
                h4 {
                    padding: 0 0 20px 20px;
                    font-size: 16px;
                    color: #333;
                    border-bottom: 1px solid #e4e7ed;
                }
                .pledge {
                    padding: 20px;
                    .pledge-top {
                        h5 {
                            margin: 20px 0;
                            font-size: 16px;
                            color: #333;
                            &:first-of-type {
                                margin-bottom: 0;
                            }
                        }
                        .all-pledge {
                            p {
                                font-size: 12px;
                                color: #606266;
                            }
                            span {
                                font-size: 36px;
                                color: #f07e1b;
                                font-weight: 700;
                            }
                        }
                        .two-btn {
                            float: right;
                        }
                    }
                    .pledge-item {
                        padding: 20px 15px;
                        margin-top: 20px;
                        border: 1px solid #e4e7ed;
                        border-radius: 5px;
                        h5 {
                            margin: 0;
                            padding-left: 5px;
                            font-size: 16px;
                            color: #333;
                            border-left: 3px solid #f07e1b;
                        }
                        .bledge-content {
                            margin-top: 20px;
                            .item-left {
                                margin-top: 20px;
                                .fang {
                                    margin: 0 auto;
                                    width: 80%;
                                    height: 94px;
                                    border: 1px solid #f5dab1;
                                    border-radius: 4px;
                                    background: #fdf6ec;
                                    p {
                                        line-height: 34px;
                                        font-size: 16px;
                                        color: #f07e1b;
                                        text-align: center;
                                        border-bottom: 1px solid #f5dab1;
                                    }
                                    span {
                                        display: block;
                                        line-height: 60px;
                                        font-size: 36px;
                                        color: #f07e1b;
                                        text-align: center;
                                        font-weight: 700;
                                    }
                                }
                                .time {
                                    margin-top: 10px;
                                    font-size: 12px;
                                    color: #909399;
                                    text-align: center;
                                }
                            }
                            .item-right {
                                .right-row {
                                    line-height: 26px;
                                    font-size: 14px;
                                    color: #5d6b6e;
                                }
                            }
                        }
                    }
                    .block {
                        margin-top: 20px;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>