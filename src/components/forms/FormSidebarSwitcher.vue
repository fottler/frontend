<template>
    <div class="open-sidebar"
         @click.prevent="$emit('click')">

        <div class="headline">{{title}}</div>
        <div class="value">{{value}}</div>

        <img src="/images/icons/dropdown-right.svg" alt="" class="arrow">
    </div>
</template>

<script>
    export default {
        name: 'FormSidebarSwitcher',
        props: {
            title: String,
            value: String
        }
    }
</script>
