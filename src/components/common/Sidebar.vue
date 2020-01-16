<template>
    <div class="sidebar-wrapper"
         :class="{opened}"
         @click.self.prevent="$emit('close', false)">

        <div class="sidebar-inner">

            <div class="header">
                <slot name="header">
                    <h2 v-if="headline">{{headline}}</h2>
                </slot>

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
        name: 'Sidebar',
        model: {
            prop: 'opened',
            event: 'close'
        },
        props: {
            opened: Boolean,
            showCloseButton: {
                type: Boolean,
                default: true
            },
            headline: String
        }
    }
</script>
