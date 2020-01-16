<template>
    <div class="request-bar">
        <div class="text">
            Добавить {{name}} в друзья?
        </div>

        <table class="w-100">
            <tr>
                <td>
                    <a href="#"
                       class="button yellow-button w-auto"
                       @click.prevent="$emit('accept')">добавить</a>
                </td>
                <td>
                    <a href="#"
                       class="button w-auto"
                       @click.prevent="$emit('reject')">отклонить</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'FriendRequest',
        props: {
            name: String
        }
    }
</script>
