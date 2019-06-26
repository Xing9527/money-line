<template>
    <div class="wallet-container">
        <img src="../assets/images/wallet-bg.jpg" style="width: 100%;" alt=""/>
        <p style="margin: 20px 0 ;color: #999;text-align: center">财富链主网上线前指定合作钱包，推荐使用以下钱包转账和存储TITT</p>
        <div class="use-wallet row">
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="item">
                    <img class="logo" src="../assets/images/pocket.png" alt=""/>
                    <a href="https://www.tokenpocket.pro/zh/download/android" target="_blank">
                        <img src="../assets/images/anzhuo.png" alt=""/>
                        <span>Android下载</span>
                    </a>
                    <a href="https://www.tokenpocket.pro/zh/download/ios" target="_blank">
                        <img src="../assets/images/ios.png" alt=""/>
                        <span>IOS下载</span>
                    </a>
                    <a href="https://www.tokenpocket.pro/zh/download/pc" target="_blank">
                        <img src="../assets/images/windows.png" alt=""/>
                        <span>桌面版下载</span>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="item">
                    <img class="logo" src="../assets/images/im.png" alt=""/>
                    <a href="https://www.tokenpocket.pro/zh/download/android" target="_blank">
                        <img src="../assets/images/anzhuo.png" alt=""/>
                        <span>Android下载</span>
                    </a>
                    <a href="https://www.tokenpocket.pro/zh/download/ios" target="_blank">
                        <img src="../assets/images/ios.png" alt=""/>
                        <span>IOS下载</span>
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="item">
                    <img class="logo" src="../assets/images/biwei.png" alt=""/>
                    <img class="erweima" src="../assets/images/baiwei_download.png" alt=""/>
                    <p>扫码下载</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-wallet"
    }
</script>

<style lang="scss" scoped>
    .wallet-container {
        padding-top: 56px;
        .use-wallet {
            max-width: 1110px;
            margin: 0 auto;
            .item {
                width: 220px;
                height: 338px;
                margin: 0 auto 30px;
                border: 1px solid #ccc;
                text-align: center;
                .logo {
                    margin-bottom: 30px;
                }
                a {
                    display: block;
                    width: 140px;
                    margin: 10px auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 6px;
                    color: #333;
                    line-height: 27px;
                    img {
                        float: left;
                        width: 30px;
                        height: 30px;
                    }
                }
                .erweima {
                    width: 128px;
                    height: 128px;
                }
                p {
                    margin-top: 10px;
                }
            }
        }
    }
</style>