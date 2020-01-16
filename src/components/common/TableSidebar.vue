<template>
    <div class="sidebar-wrapper h-100-sidebar"
         :class="{opened}"
         @click.self.prevent="$emit('close', false)">

        <div class="sidebar-inner">
            <table>
                <tr>
                    <td class="header">
                        <h2 v-if="headline">{{headline}}</h2>

                        <a href="#"
                           class="close-button"
                           v-if="showCloseButton"
                           @click.prevent="$emit('close', false)"></a>
                    </td>
                </tr>
                <tr>
                    <td class="content">
                        <slot></slot>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TableSidebar',
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
