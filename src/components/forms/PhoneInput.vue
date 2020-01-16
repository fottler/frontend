<template>
    <input type="text"
           :value="formatted"
           @input="onInput"
           ref="input">
</template>

<script>
    import PhoneMask from "@/core/PhoneMask";
    import User from "@/modules/user/models/User";

    const phoneMask = new PhoneMask(User.phoneMask.prefix, User.phoneMask.mask);

    export default {
        name: 'PhoneInput',
        props: {
            value: String
        },
        computed: {
            formatted: function(){
                return phoneMask.rawToFormatted(this.value);
            }
        },
        methods: {
            onInput(event){
                const raw = phoneMask.formattedToRaw(event.target.value);

                this.$refs.input.value = phoneMask.rawToFormatted(raw);

                this.$emit('input', raw);
            }
        }
    }
</script>
