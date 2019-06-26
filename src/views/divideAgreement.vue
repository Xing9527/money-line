<template>
    <div class="notice-list">
        <div class="nav-top clear">
            <el-button type="primary" plain size="small" icon="el-icon-back" style="float: left;" @click="$router.go(-1)">返回</el-button>
            <p>当前位置：<router-link to="/personCenter">个人中心</router-link> > <router-link v-if="$route.query.type == 'person'" to="/personApply">个人抵押TITT申请表</router-link><router-link v-if="$route.query.type == 'company'" to="/companyApply">企业抵押TITT申请表</router-link> > <router-link to="/divideAgreement">《抵押分红协议》</router-link></p>
        </div>
        <div class="list">
            <h4>抵押分红协议</h4>
            <div class="content-text">
                <p>这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。</p>
                <p>这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。</p>
                <p>这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。</p>
                <p>这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。这是抵押分红协议的详细内容。</p>
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
                size:10
            }
        },
        mounted() {

        },
        methods: {
            handleSizeChange(size) {
                this.size = size;
            },
            handleCurrentChange(page) {
                this.page = page;
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
            }
            .content-text {
                margin: 0 auto;
                font-size: 13px;
                color: #696266;
                line-height: 24px;
                width: 90%;
                text-indent: 2em;
                p {
                    margin-top: 30px;
                }
            }
        }
    }
</style>