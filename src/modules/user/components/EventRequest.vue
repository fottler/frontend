<template>
    <div class="request-bar">
        <div class="text">
            {{name}} хочет принять участие в
            <a href="#"
               class="black"
               @click.prevent="$emit('open-event')">{{eventTitle}}</a>
        </div>

        <table class="w-100">
            <tr>
                <td>
                    <a href="#"
                       class="button yellow-button w-auto"
                       @click.prevent="$emit('accept')">&nbsp; принять &nbsp;</a>
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
        name: 'EventRequest',
        props: {
            name: String,
            eventTitle: String
        }
    }
</script>
