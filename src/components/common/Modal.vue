<template>
    <div class="modal-wrapper"
         :class="{shown}"
         @click.self.prevent="$emit('close', false)">

        <div class="modal-inner">

            <div class="header">
                <div class="headline"
                     v-if="headline">{{headline}}</div>

                <a href="#"
                   class="close-button"
                   v-if="showCloseButton"
                   @click.prevent="$emit('close', false)"></a>
            </div>

            <div class="content">
                <slot></slot>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'Modal',
        model: {
            prop: 'shown',
            event: 'close'
        },
        props: {
            shown: Boolean,
            showCloseButton: {
                type: Boolean,
                default: true
            },
            headline: String
        }
    }
</script>
