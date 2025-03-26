<template>
    <div class="logotype">
        <img class="logotype__image" src="/icons/SappeR.svg" />
        <p class="logotype__paragraph">click / boom! / repeat</p>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.logotype {
    position: relative;
    height: 200px;
    padding-top: 60px;
    background-image: url("/icons/Star-big.svg");
    background-repeat: no-repeat;
    background-position: center;
    /* background-position-y: -55px; */
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: -0px;
}

.logotype__paragraph {
    position: absolute;
    top: 150px;
    font-family: var(--font-paragraph);
    font-size: 1rem;
    font-weight: 400;
}
</style>
