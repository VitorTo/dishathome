<script lang="ts">
import Tag from './Tag.vue';

export default {
    components: { Tag },
    emits: ['adicionar-ingrediente', 'remover-ingrediente'],
    props: {
        ingrediente: { type: String, required: true }
    },
    data() {
        return {
            selecionado: false
        }
    },
    methods: {
        aoClicar() {
            this.selecionado = !this.selecionado
            if(this.selecionado) {
                this.$emit('adicionar-ingrediente', this.ingrediente)
            } else {
                this.$emit('remover-ingrediente', this.ingrediente)
            }
        }
    }
}
</script>

<template>
    <button
        class="ingrediente"
       @click="aoClicar"
       :aria-pressed="selecionado"
    >
        <Tag :texto="ingrediente" :ativa="selecionado" />
    </button>
</template>

<style scoped>
.ingrediente {
    cursor: pointer;
}
</style>