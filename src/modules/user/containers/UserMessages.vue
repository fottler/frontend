<template>
    <table class="chat">
        <tr class="bb chat-messages-list">
            <td colspan="2">
                <message-list :last-load-direction="lastLoadDirection"
                              :user="user"
                              :items="messages"
                              @scrollToTop="onScrollToTop"></message-list>
            </td>
        </tr>

        <tr class="send-message-wrapper">
            <td>
                <input type="text"
                       class="grey-input"
                       placeholder="Введите сообщение"
                       v-model.trim="text"
                       @keyup.enter="submit">
            </td>

            <td>
                <a href="#"
                   class="send-button"
                   @click.prevent="submit"></a>
            </td>
        </tr>
    </table>
</template>

<script>
    import MessageList from "@/modules/message/containers/MessageList";
    import {loadNew, loadOld, initMessages, stopLoadingNew} from "@/modules/message/store/message.types";
    import {submit} from "@/store/types";
    import { createNamespacedHelpers } from 'vuex'
    import { createHelpers } from 'vuex-map-fields';

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('userMessages');
    const { mapState: mapUserState } = createNamespacedHelpers('user');
    const { mapFields } = createHelpers({
        getterType: 'userMessages/getNewMessageField',
        mutationType: 'userMessages/updateNewMessageField',
    });

    export default {
        name: 'UserMessages',
        components: {MessageList},
        props: {
            interlocutor: Object
        },
        computed: {
            ...mapState(['lastLoadDirection']),
            ...mapGetters(['messages']),
            ...mapFields(['text']),
            ...mapUserState(['user'])
        },
        async created(){
            this[initMessages](this.interlocutor.id);

            await this[loadOld]();
            await this[loadNew]();
        },
        destroyed(){
            this[stopLoadingNew]();
        },
        methods: {
            onScrollToTop(){
                this[loadOld]();
            },
            ...mapActions([
                initMessages,
                loadOld,
                loadNew,
                submit,
                stopLoadingNew
            ])
        }
    }
</script>
