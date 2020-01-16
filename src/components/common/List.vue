<template>
    <div>
        <div :class="itemClass"
             v-for="(item, index) in items"
             :key="item.id">

            <slot :index="index"
                  :item="item"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            itemClass: String,
            items: Array
        }
    }
</script>
