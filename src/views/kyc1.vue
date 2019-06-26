<template>
    <div class="notice-list kyc">
        <div class="nav-top clear">
            <el-button type="primary" plain size="small" icon="el-icon-back" style="float: left;" @click="$router.go(-1)">返回</el-button>
            <p>当前位置：<router-link to="/personCenter">个人中心</router-link> > <router-link to="/kyc1">KYC1认证</router-link></p>
        </div>
        <div class="list">
            <h4>
                <span class="img">
                    <img src="../assets/images/kyc1.png" alt=""/>
                    <span class="img-text">KYC1认证</span>
                </span>
                <span>KYC1认证</span>
            </h4>

            <!--未认证-->
            <template v-if="agree == '0'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="max-width: 400px;margin: 60px auto 40px;">
                    <el-form-item label="选择国家" prop="country">
                        <el-select v-model="ruleForm.country" placeholder="请选择您的国家" style="width: 100%;">
                            <el-option v-for="(item,index) in phoneList" :key="index" :label="item.area + item.phone" :value="item.area"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input placeholder="请输入您的姓名" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="id_code">
                        <el-input placeholder="请输入您的身份证号码" v-model="ruleForm.card"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                    <el-button type="primary" style="width: 200px;" @click="subData">提交申请</el-button>
                </div>
            </template>

            <!--正在审核-->
            <template v-else-if="agree == '1'">
                <p style="font-size: 18px;color: #f07e1b;text-align: center;margin: 100px 0 120px;">请等待公司审核，一般会在2～5个工作日内审核完成。请留意本页更新。</p>
                <div style="text-align: center">
                    <el-button type="primary" @click="$router.push('/personCenter')" style="width: 200px;">确定</el-button>
                </div>
            </template>

            <!--审核通过-->
            <template v-else-if="agree == '2'">
                <p style="font-size: 18px;color: #f07e1b;text-align: center;margin: 100px 0 120px;">您的认证已经通过了！</p>
                <div style="text-align: center">
                    <el-button type="primary" @click="$router.push('/personCenter')" style="width: 200px;">确定</el-button>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import phone from '../assets/json/phone'
    export default {
        name: "notice-list",
        data() {
            return {
                agree:'0',
                phoneList:[],
                ruleForm:{
                    country:'中国大陆'
                },
                rules: {
                    country: [
                        { required: true, message: '请选择国家', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    card: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' },
                        { min: 18, max: 18, message: '请输入正确格式', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.phoneList = phone;
            if(sessionStorage.getItem('user')) {
                var user = JSON.parse(sessionStorage.getItem('user'))
                if(user.kyc1 == '1') {
                    this.agree = '2'
                }else if(user.kyc1 == '2') {
                    this.agree = '1'
                }else if(user.kyc1 == '3' ||user.kyc1 == '4') {
                    this.agree = '0'
                }
            }
        },
        methods: {
            subData() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('user/kyc1renzheng',this.ruleForm).then(res => {
                            if(res.data.sta == 1) {
                                this.agree = '1'                                
                            }
                        })
                    } else {
                        return false;
                    }
                });
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
        .list {
            margin-top: 20px;
            padding: 34px 0 40px;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
            border-radius: 3px;
            h4 {
                margin: 20px 0;
                font-size: 22px;
                color: #303133;
                text-align: center;
                .img {
                    position: relative;
                    .img-text {
                        position: absolute;
                        width: 30px;
                        left: 8px;
                        top: 5px;
                        font-size: 10px;
                        color: #fefffe;
                        line-height: 12px;
                        font-weight: 100;
                    }
                }
            }
        }
    }
</style>