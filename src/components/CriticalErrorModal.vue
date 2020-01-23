<template>
    <Modal class="service-modal"
           :shown="shown"
           :show-close-button="false">

        <p class="font-16 mb-10">Произошла ошибка.</p>
        <p>Перезагрузите страницу и попробуйте ещё раз</p>
        <p class="mb-0">
            <a href="#"
               class="button yellow-button w-auto"
               @click.prevent="refresh">Перезагрузить</a>
        </p>
    </Modal>
</template>

<script>
    import Modal from "@/components/common/Modal";

    export default {
        name: 'CriticalErrorModal',
        components: {Modal},
        props: {
            shown: Boolean
        },
        methods: {
            refresh(){
                window.location.reload();
            }
        }
    }
</script>
