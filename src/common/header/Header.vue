<template>
    <div class="music-header">
        <span class="header-back" @click="goBack">
            <i class="icon-back"></i>
        </span>
        <div class="header-title">{{title}}</div>
    </div>
</template>

<script>
    import './header.styl'

    export default{
    	props: ['title'],
        methods: {
    		goBack(){
    			window.history.back();
            }
        }
    }
</script>