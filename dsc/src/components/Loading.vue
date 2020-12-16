<!--  -->
<template>
<div class='loading'>
    <img src="@/assets/images/loading.gif" alt="">
    <div style="color:#fff">玩命加载中...</div>
</div>
</template>


<style lang="less">
.loading{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img{
        width: 5rem;
        height: 5rem;
    }
}

</style>