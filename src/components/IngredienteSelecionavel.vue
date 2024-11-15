<script lang="ts">
import Tag from './Tag.vue';

export default {
    components: { Tag },
    emits: ['adicionar-ingrediente', 'remover-ingrediente'],
    props: {
        ingrediente: { 
            type: String, 
            required: true 
        },
        isSelected: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selecionado: false
        }
    },
    methods: {
        toggleSelection() {
            if (this.isSelected) {
                this.$emit('remover-ingrediente', this.ingrediente);
            } else {
                this.$emit('adicionar-ingrediente', this.ingrediente);
            }
        },
    }
}
</script>

<template>
    <button
        class="ingrediente"
       @click="toggleSelection"
       :aria-pressed="isSelected"
    >
        <Tag :texto="ingrediente" :ativa="isSelected" />
    </button>
</template>

<style scoped>
.ingrediente {
    cursor: pointer;
}
</style>