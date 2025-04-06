<template>
    <div class="wrapper">
        <div class="wrapper__star">
            <span class="wrapper__content">4</span>
            <span class="wrapper__content">4</span>
        </div>
        <p class="wrapper__paragraph">boom!</p>
        <nav class="wrapper__nav">
            <router-link :to="`/`" class="wrapper__anchor" replace>
                Back to home page
            </router-link>
        </nav>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 10vh;

    display: flex;
    flex-direction: column;
    align-items: center;
}
.wrapper__star {
    min-width: 100%;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    background-image: url("/icons/Star-big.svg");
    background-repeat: no-repeat;
    background-position: center;
}
.wrapper__content {
    font-size: 5rem;
    font-family: var(--font-paragraph);
    font-weight: 600;
}
.wrapper__paragraph {
    position: absolute;
    padding-bottom: 20px;
    font-family: var(--font-paragraph);
    font-size: 1rem;
    font-weight: 400;
}
.wrapper__anchor {
    text-decoration: none;
    font-family: var(--font-paragraph);
    font-size: 1rem;
    color: var(--color-black);
}
.wrapper__anchor:hover {
    color: var(--color-grey);
}
</style>
