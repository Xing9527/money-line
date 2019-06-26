<template>
    <div class="login clear">
        <img src="../assets/images/login_bg.jpg" style="width: 100%;position: absolute;top: 55px;z-index: -1;" alt=""/>
        <div class="form">
            <div class="form-content">
                <h3>注册即可获得50通证</h3>
                <p class="title">邀请好友获得更多</p>
                <div class="phone">
                    <el-input v-model="formData.eos" placeholder="请输入常用EOS账号作为您的用户名"></el-input>
                </div>
                <div style="margin-bottom: 10px;">
                    <el-input v-model="formData.pwd" placeholder="请设定您的登录密码，至少8位" show-password></el-input>
                </div>
                <div style="margin-bottom: 10px;">
                    <el-input v-model="formData.yaoqing" placeholder="请输入邀请码（可选）"></el-input>
                </div>
                <div style="margin-bottom: 10px;">
                    <el-input v-model="formData.payPwd" placeholder="请设定您的交易密码，至少6位数字" show-password></el-input>
                </div>
                <div style="margin-bottom: 10px;">
                    <el-input v-model="formData.email" placeholder="请输入常用Email地址"></el-input>
                </div>
                <p class="rule">
                    <el-checkbox v-model="checked"></el-checkbox>
                    我已阅读并同意
                    <router-link to="/userRules">《用户注册协议》</router-link>
                </p>
                <el-button type="primary" style="width: 100%;margin: 10px 0 0;" @click="register">GO!领取50通证</el-button>
                <router-link to="/login" class="forget">已有财富链账号？去登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "login",
        data() {
            return {
                formData:{

                },
                checked:true
            }
        },
        mounted() {

        },
        methods: {
            register() {
                if(!this.checked) {
                    this.$message({
                        message: '请阅读用户注册协议并同意！',
                        type: 'warning'
                    });
                    return
                }
                var reg = new RegExp(/^\d{6,}$/);
                if(!this.formData.eos) {
                    this.$message.error('请输入EOS账号！');
                }else if(this.formData.eos.length != 12) {
                    this.$message.error('输入的EOS账号格式不正确！');
                }else if(!this.formData.pwd || this.formData.pwd.length < 8) {
                    this.$message.error('请输入正确的登录密码格式！');
                }else if(reg.test(this.formData.payPwd)) {
                    this.$message.error('请输入正确的交易密码格式！');
                }else if(!this.formData.email){
                    this.$message.error('请输入常用邮箱地址！');
                }else {
                    this.$axios.get('tourist/iseos',{eoscode:this.formData.eos}).then(res => {
                        if(res.data.errno ==0 && res.data.data.tokens.length != 0) {
                            if(this.checkEmail()) {
                                this.sureRegister()
                            }
                        }else {
                            this.$message.error('输入的EOS账号错误或不存在！');
                        }
                    })
                
                }
            },
            checkEmail() {
            　　var myemail=this.formData.email;
            　　var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            
            　　if(myReg.test(myemail)){
            　　　　return true;
            　　}else{
                    this.$message.error('输入的邮箱格式不正确！')
            　　　　return false;
                }
            },
            sureRegister() {
                var params = {
                    username:this.formData.eos,
                    password:this.formData.pwd,
                    fyaoqingma:this.formData.yaoqing,
                    paypassword:this.formData.payPwd,
                    email:this.formData.email
                }
                this.$axios.post('tourist/register',params).then(res => {
                    if(res.data.sta == 1) {
                        this.$message({
                            message: '请前往邮箱激活后再进行登录！',
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.push('/login')
                        },200)
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
    .login {
        padding-top: 56px;
        /*position: relative;*/
        /*height: 600px;*/
        .form {
            /*<!--clear: both;-->*/
            /*<!--position: absolute;-->*/
            /*<!--top: 130px;-->*/
            /*<!--left: 50%;-->*/
            /*<!--transform: translateX(-50%);-->*/
            max-width: 480px;
            min-width: 320px;
            margin: 70px auto 20px;
            padding: 10px 0 20px;
            background: #fff;
            border-radius: 3px;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
            .form-content {
                width: 80%;
                margin: 40px auto 90px;
                text-align: center;
                h3 {
                    margin: 0 0 10px;
                    font-size: 30px;
                    color: #303133;
                }
                .title {
                    font-size: 18px;
                    color: #f07e1b;
                }
                .phone {
                    margin: 30px 0 10px;
                }
                .forget {
                    font-size: 14px;
                    color: #409eff;
                    float: right;
                    margin-top: 20px;
                }
                .rule {
                    text-align: left;
                    a {
                        color: #409eff;
                    }
                }
            }
        }
    }
</style>