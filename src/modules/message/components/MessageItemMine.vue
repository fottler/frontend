<template>
    <div>
        <table class="message mine">
            <tr>
                <td class="time-wrapper">{{time}}</td>
                <td class="text-wrapper">
                    <div class="text">{{message.text}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'MessageItemMine',
        props: {
            message: Object,
            time: String
        }
    }
</script>
