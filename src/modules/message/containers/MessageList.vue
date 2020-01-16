<template>
    <div @scroll="handleScroll"
         ref="list">
        <table class="chat-messages-list-inner">
            <tr>
                <td class="chat-messages-list-inner-inner">

                    <message-item v-for="item in items"
                                  :key="item.id"
                                  :message="item"
                                  :is-owner="user.id === item.user_id"></message-item>

                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Constants from "@/core/Constants";
    import MessageItem from "@/modules/message/containers/MessageItem";

    export default {
        name: 'MessageList',
        components: {MessageItem},
        props: {
            user: Object,
            items: Array,
            lastLoadDirection: String
        },
        data(){
            return {
                scrollHeight: 0,
                shouldScrollToBottom: null
            }
        },
        watch: {
            items(){
                this.storeScroll();

                this.$nextTick(()=>{
                    if(this.shouldScrollToBottom) {
                        this.scrollToBottom();
                    }
                    else if(this.lastLoadDirection === Constants.TOP){
                        this.restoreScroll();
                    }
                });
            }
        },
        mounted(){
            this.scrollToBottom();
        },
        methods: {
            handleScroll(e){
                if (e.target.scrollTop === 0){
                    this.$emit('scrollToTop');
                }
            },
            scrollToBottom () {
                const listEl = this.$refs.list;

                listEl.scrollTop = listEl.scrollHeight;
            },
            storeScroll(){
                const listEl = this.$refs.list;

                this.scrollHeight = listEl.scrollHeight;
                this.shouldScrollToBottom = (listEl.scrollTop > listEl.scrollHeight - 1.5*document.documentElement.clientHeight);
            },
            restoreScroll(){
                const listEl = this.$refs.list;

                listEl.scrollTop = listEl.scrollHeight - this.scrollHeight + listEl.scrollTop;
            }
        }
    }
</script>
