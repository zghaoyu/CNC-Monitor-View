<template>
    <h1>Settings</h1>
    <Login  v-show="show" @changeLoginComponentShow = "changeLoginComponentShow"></Login>
</template>
<script lang="ts" setup>
    import {ref} from "vue";
    import Login from '../components/Login.vue';
    const show = ref(true);
    function changeLoginComponentShow(){
        show.value = false;
        // console.log(111111111)
    }
</script>