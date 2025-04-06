<template>
    <div class="wire"></div>
    <div class="switch"></div>
    <!-- <div class="wire_btn"></div> -->
</template>

<script setup lang="ts"></script>

<style scoped>
.wire,
.switch {
    position: relative;
    top: -22px;
    right: 0;
}
.wire::before {
    content: "";
    position: absolute;
    top: -34px;
    left: -50px;
    z-index: -1;

    height: 170px;
    width: 125px;
    background-image: url(../assets/images/Group1.svg);
    background-repeat: no-repeat;
    pointer-events: none;
}
.switch::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -11px;
    right: 12px;
    height: 21px;
    width: 60px;
    background-image: url(../assets/images/Group3.svg);
    background-repeat: no-repeat;
}
.switch::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 2px;
    right: 90px;

    height: 10px;
    width: 30px;
    background-color: var(--color-grey);
}
/* .wire_btn {
    bottom: 0px;
    left: 0px;
}
.wire_btn::after {
    content: "";
    position: absolute;
    bottom: -118px;
    left: 90px;
    rotate: 90deg;
    z-index: -1;

    height: 182px;
    width: 51px;
    background-image: url(../assets/images/Group2.svg);
    background-repeat: no-repeat;
} */
</style>
