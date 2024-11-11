<script lang="ts">

export default {
    emits: ['buscar-receitas'],
    props: {
        active: Boolean
    },
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        aoClicar() {
            if(this.active) {
                this.isLoading = true
                this.$emit('buscar-receitas', true)
            } else {
                this.isLoading = false
            }

            setTimeout(() => {
                this.isLoading = false
            }, 600)
        }
    }
}
</script>

<template>
    <button
        :class="['buscar-receitas', active ? 'active' : 'desactive']"
        @click="aoClicar"
        :aria-pressed="selecionado"
    >
        <i 
            v-if="isLoading" 
            class="fas fa-spinner"
        ></i>
        <i v-else class="fas fa-search"></i>
        <span :class="['btn-text', isLoading ? 'is-loading' : '']">
            {{ isLoading ? 'Buscando...' : 'Buscar receitas!' }}
        </span>
    </button>
</template>

<style lang="scss" scoped>
.buscar-receitas {
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
}
.active {
    color: var(--creme, #FFFAF3);
    background-color: #F0633C;
}
.desactive {
    color: var(--cinza);
    background-color: var(--cinza-claro);
}

.buscar-receitas i {
    font-size: 1.5rem;
}
.buscar-receitas .btn-text {
    font-size: 1.2rem;
    font-weight: bold;
}

.btn-text {
    display: none;
    margin-left: 10px;
}

.buscar-receitas:hover .btn-text {
    display: inline-block;
    animation: type 1s steps(10, end);
}

@keyframes type {
    from {
        width: 0;
    }
    to {
        width: 60%;
    }
}

.buscar-receitas:hover {
    width: 220px;
}

.buscar-receitas:hover .btn-text {
    display: inline-block;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.fa-spinner {
    animation: spin 1s linear infinite;
}
</style>