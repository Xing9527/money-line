<template>
    <div class="notice-list">
        <div class="nav-top clear">
            <el-button type="primary" plain size="small" icon="el-icon-back" style="float: left;" @click="$router.go(-1)">返回</el-button>
            <p>当前位置：<router-link to="/personCenter">个人中心</router-link> > <router-link to="">红股转赠</router-link></p>
        </div>
        <h3>红股转赠</h3>
        <div class="list">
            <div class="change">
                <div class="can-change">
                    <p>可转赠红股数量</p>
                    <p>{{hongguyijiesuo}}</p>
                </div>
                <div class="input">
                    <div class="top">
                        <span>对方账号：</span>
                        <el-input v-model="titt" style="width: 220px;" placeholder="请输入对方的个人ID账号"></el-input>
                    </div>
                    <div class="middle">
                        <span>转赠数量：</span>
                        <el-input v-model="hongguNum" style="width: 220px;" placeholder="请输入转赠红股数量（红股）" @blur="getNum"></el-input>
                    </div>
                    <div class="middle">
                        <span>手续费率：</span>
                        <el-input v-model="num" style="width: 220px;" placeholder="自动计算（红股）" :disabled="true"></el-input>
                    </div>
                    <div class="bottom">
                        <el-button type="primary" style="width: 200px;" @click="applyChange">转赠</el-button>
                    </div>
                </div>
            </div>
            <h5>转赠记录</h5>
            <div class="change-list">
                <el-row class="item-title">
                    <el-col :span="5">日期</el-col>
                    <el-col :span="5">对方ID号</el-col>
                    <el-col :span="4">状态</el-col>
                    <el-col :span="5">转增红股数量</el-col>
                    <el-col :span="5">手续费（百分比）</el-col>
                </el-row>
                <el-row class="list-item" v-for="(item,index) in changeList" :key="index">
                    <el-col :span="5">{{item.createtime}}</el-col>
                    <el-col :span="5">{{item.other_mobile}}</el-col>
                    <el-col :span="4">{{item.status}}</el-col>
                    <el-col :span="5">{{item.give_bonus}}</el-col>
                    <el-col :span="5">{{item.ratio}}</el-col>
                </el-row>
            </div>
            <div class="block">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="gonggao">
            <div class="left">
                <p class="title">场外财富链转赠交流群：</p>
                <p>请加官方微信：wxid_0lqllslbq6cc22（添加请备注财富链红股转赠），进入财富链转赠交流群，官方担保，万无一失。用户也可添加由官方认证的“担保志愿者”，进入志愿者担保群。</p>
                <p class="title">通过官方认可的志愿者微信</p>
                <p>jinqiushidai1</p>
            </div>
            <div class="right">
                <p class="title">转赠须知</p>
                <el-row class="row">
                    <el-col :span="12">个人贡献值</el-col>
                    <el-col :span="12">财富链转赠手续费</el-col>
                </el-row>
                <el-row v-for="(item,index) in gongxianList" :key="index">
                    <el-col :span="12">{{item.title}}</el-col>
                    <el-col :span="12">{{item.value}}</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "notice-list",
        data() {
            return {
                page:1,
                total:0,
                changeList:[],
                hongguNum:'',
                titt:'',
                tittNum:0,
                num:'',
                hongguyijiesuo:'',
                gongxianList:[
                    { title: '个人贡献值<15', value: '50%' },
                    { title: '15≤个人贡献值<50', value: '30%' },
                    { title: '50≤个人贡献值<300', value: '25%' },
                    { title: '300≤个人贡献值<1000', value: '20%' },
                    { title: '1000≤个人贡献值<3000', value: '15%' },
                    { title: '≥3000', value: '10%' },
                ]
            }
        },
        watch: {
            hongguNum(val) {
                if(val > this.hongguyijiesuo) {
                    this.hongguNum = this.hongguyijiesuo
                }
            }
        },
        mounted() {
            this.getWeekList();
            this.getHonggu()
        },
        methods: {
            getNum() {
                if(this.hongguNum > 0) {
                    this.$axios.get('increase/getIncreaseCommission',{token:sessionStorage.getItem('token'),num:this.hongguNum}).then(res => {
                        if(res.data.sta == 401) {
                            this.$message.error("请重新登录！");
                            this.$router.push('/login')
                        }
                        if(res.data.data) {
                            this.num = res.data.data;
                        }
                    })
                }else {
                    this.num = ''
                }
            },
            handleCurrentChange(page) {
                this.page = page;
                this.getWeekList()
            },
            getWeekList() {
                this.$axios.get('increase/getRecord',{token:sessionStorage.getItem('token'),page:this.page}).then(res => {
                    if(res.data.sta == 401) {
                        this.$message.error("请重新登录！");
                        this.$router.push('/login')
                    }
                    if(res.data.data) {
                        this.changeList = res.data.data.data;
                        this.total = res.data.data.total;
                    }
                })
            },
            getHonggu() {
                this.$axios.get('user/userinfo',{token:sessionStorage.getItem('token')}).then(res => {
                    if(res.data.sta == 401) {
                        this.$message.error("请重新登录！");
                        this.$router.push('/login')
                    }
                    if(res.data) {
                        this.hongguyijiesuo = res.data.hongguyijiesuo;
                    }
                })
            },
            applyChange() {
                if(!this.hongguNum) {
                    this.$message.error('请输入要转赠的红股数量！');
                }else if(!this.titt) {
                    this.$message.error('请输入对方账号！');
                }else {
                    this.$axios.post('increase/addIncreaseCommission', { num: this.hongguNum, mobile: this.titt, token:sessionStorage.getItem('token') }).then(res => {
                        if(res.data.sta == 401) {
                            this.$message.error("请重新登录！");
                            this.$router.push('/login')
                        }
                        if(res.data.sta == 200) {
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });

                            this.hongguNum = '';
                            this.num = '';
                            this.getWeekList();
                            this.getHonggu();
                        }else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notice-list {
        margin: 75px auto 20px;
        max-width: 960px;
        .nav-top {
            p {
                float: right;
                font-size: 14px;
                a {
                    color: #409eff;
                }
            }
        }
        h3 {
            font-size: 30px;
            color: #303133;
            text-align: center;
            margin: 20px 0;
        }
        .list {
            padding: 20px 0 20px;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
            border-radius: 3px;
            .list-title {
                padding: 0 20px 10px;
                border-bottom: 1px solid #ddd;
                h4 {
                    margin: 0;
                    font-size: 16px;
                }
                p {
                    font-size: 12px;
                }
            }
            h5 {
                margin: 20px 20px 0;
                padding-bottom: 10px;
                padding-left: 20px;
                font-size: 24px;
                font-weight: 500;
                color: #333;
                border-bottom: 1px solid #a3a6b4;
            }
            .change {
                width: 90%;
                margin: 0 auto;
                overflow: hidden;
                .can-change {
                    margin: 20px 80px 20px 100px;
                    float: left;
                    p {
                        &:last-of-type {
                            margin: 10px 0 20px;
                            font-size: 26px;
                            font-weight: 700;
                            color: #f07e1b;
                        }
                    }
                }
                .input {
                    float: left;
                    .middle {
                        margin: 15px 0;
                    }
                    .bottom {
                        text-align: center;
                    }
                }
            }
            .change-list {
                padding: 10px 20px;
                word-wrap: break-word;
                .item-title {
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
            .block {
                text-align: center;
                margin-top: 10px;
            }
        }
        .gonggao {
            /*overflow: hidden;*/
            margin: 20px 0 50px;
            .left {
                padding: 20px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                border-radius: 3px;
                width: 45%;
                display: inline-block;
                .title {
                    margin:10px 0 10px;
                    font-weight: bold;
                }
            }
            .right {
                padding: 20px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                border-radius: 3px;
                width: 45%;
                float: right;
                text-align: center;
                line-height: 30px;
                .title {
                    margin: 10px 0;
                    font-weight: bold;
                    text-align: left;
                }
                .row {
                    border-bottom: 1px solid #f1f1f3;
                }
            }
        }
    }
</style>