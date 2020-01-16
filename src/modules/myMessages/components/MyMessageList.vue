<template>
    <List class="messages-list"
          :items="messages"
          v-slot="{index, item}">

        <my-message-item :index="index"
                         :item="item"
                         @click="$emit('item-click', item)"></my-message-item>
    </List>
</template>

<script>
    import List from "@/components/common/List";
    import MyMessageItem from "@/modules/myMessages/components/MyMessageItem";

    export default {
        name: 'MyMessageList',
        components: {MyMessageItem, List},
        props: {
            messages: Array
        }
    }
</script>
