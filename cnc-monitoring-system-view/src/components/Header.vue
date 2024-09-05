<template>
    <div class="header">
        <img alt="sto logo" class="logo" src="@/assets/sto_logo.png" height="35" />
        <span class="title">CNC Monitoring System</span>
    </div>
    <Theme></Theme>
</template>
<script setup>
import Theme from './Theme.vue';
</script>
<style scoped>
.header {
    /* flex: 3; */
    margin-left: 1%;
    font-size: 1.7rem;
    color: #ffffff;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header .logo{
    margin-right: 10px;
}
</style>