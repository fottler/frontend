<template>
    <div>
        <table class="message their">
            <tr>
                <td class="avatar-wrapper">
                    <img :src="avatarUrl"
                         :alt="user.name"
                         class="avatar" >
                </td>
                <td class="text-wrapper">
                    <div class="text">{{message.text}}</div>
                </td>
                <td class="time-wrapper">{{time}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'MessageItemTheir',
        props: {
            message: Object,
            time: String,
            user: Object,
            avatarUrl: String
        }
    }
</script>
