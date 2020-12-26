<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'App',
}
</script>

<style >
#app{
    -webkit-font-smoothing:antialiased;
     -moz-osx-font-smoothing: grayscale;
     height: 100%;
     width: 100%;
     box-sizing: border-box;
     margin: 0;
     padding: 0;
}
</style>