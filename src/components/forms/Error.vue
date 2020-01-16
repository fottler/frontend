<template>
    <div class="error"
         v-if="!!errorText">

        {{errorText}}
    </div>
</template>

<script>
    export default {
        name: 'Error',
        props: {
            text: [String, Array]
        },
        computed: {
            errorText(){
                return Array.isArray(this.text) ? this.text[0] : this.text;
            }
        }
    }
</script>
