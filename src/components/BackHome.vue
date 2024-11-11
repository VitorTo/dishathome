<script lang="ts">

export default {
    emits: ['back-home'],
    methods: {
        aoClicar() {
            this.$emit('back-home', true)
        }
    }
}
</script>

<template>
    <button
        :class="['back-home']"
        @click="aoClicar"
    >
        <i class="fas fa-pen"></i>
        <span :class="['btn-text']">
           Voltar
        </span>
    </button>
</template>

<style lang="scss" scoped>
.back-home {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: width 0.5s;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    
    color: var(--creme, #FFFAF3);
    background-color: #F0633C;
}

.back-home i {
    font-size: 1.5rem;
}
.back-home .btn-text {
    font-size: 1.2rem;
    font-weight: bold;
}

.btn-text {
    display: none;
    margin-left: 10px;
}

.back-home:hover .btn-text {
    display: inline-block;
    animation: type 1s steps(10, end);
}

@keyframes type {
    from {
        width: 0;
    }
    to {
        width: 40%;
    }
}

.back-home:hover {
    width: 220px;
}

.back-home:hover .btn-text {
    display: inline-block;
}
</style>