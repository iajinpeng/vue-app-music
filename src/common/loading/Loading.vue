<template>
    <div class="loading-container" v-if="show">
        <img src="../../assets/imgs/loading.gif" alt="loading" width="18px" height="18px">
        <div class="loading-title">{{title}}</div>
    </div>
</template>
<script>
    import './loading.styl'
    export default{
    	props: ['show', 'title'],
    }
</script>
