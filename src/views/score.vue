<template>
    <div class="score">
        <div class="back" @click="back">
           返回
         </div>
        <div>  
          您的最高得分是：<span>{{this.$store.state.score}}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .score{
        .back{
            height: 15vw;width: 100vw;
            background: #333;
            color: #eee;
            font-size: 1.2rem;
            position: fixed;
            top: 0;left: 0;
            order: 10;
            text-align: left;
            line-height: 15vw;
            padding-left: 5vw;
        }
        background: #d6c956;
        font-size: 1.3rem;
        position: absolute;
        width: 100vw;height: 100vh;
        text-align: center;line-height: 100vh;
        div>span{
            color: #f33;font-size: 1.8rem;
        }
    }
</style> 
<script>
export default {
    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>   