<template>
    <div :class="staticClass"
         @click.prevent="$emit('click')">

        <img :src="pictureUrl"
             :alt="item.entity_name"
             class="avatar">

        <div>
            <table class="w-100">
                <tr>
                    <td class="main-text">{{item.entity_name}}</td>
                    <td class="right">{{beautifulDate}}</td>
                </tr>
                <tr>
                    <td>{{item.last_message_text}}</td>
                    <td class="right main-text">{{item.unread_message_number}}</td>
                </tr>
            </table>
        </div>

    </div>
</template>

<script>
    import MyMessages from "@/modules/myMessages/models/MyMessages";
    import DateUtil from "@/core/utilities/DateUtil";

    export default {
        name: 'MyMessageItem',
        props: {
            item: Object
        },
        computed: {
            staticClass(){
                return 'list-row bb ' + (this.item.unread_message_number ? 'highlighted' : '');
            },
            pictureUrl(){
                return MyMessages.pictureUrl(this.item);
            },
            beautifulDate(){
                return DateUtil.toHumanReadable(this.item.last_message_datetime);
            }
        }
    }
</script>
