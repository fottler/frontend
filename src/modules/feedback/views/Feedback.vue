<template>
    <div>
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>

            <h2>Обратная связь</h2>
        </div>

        <div class="padding-around">
            <p class="description">
                Мы каждый день работаем над улучшением качества нашего сервиса.
                И хотим, чтобы ваши события и встречи проходили максимально комфортно.
            </p>
            <p class="description mb-20">
                Поэтому, если у Вас что-то не работает или Вы хотите сделать наш сервис лучше, мы будем рады Вашей обратной связи!
            </p>

            <feedback-create-form @show-modal="showModal"></feedback-create-form>
        </div>

        <Modal class="service-modal"
               v-model="modal.shown">
            <div>
                <p>Ваше сообщение отправлено!</p>
                <p class="mb-0">Спасибо, что помогаете нам стать лучше!</p>
            </div>
        </Modal>
    </div>
</template>

<script>
    import modalHandler from "@/mixins/modalHandler";
    import Modal from "@/components/common/Modal";
    import FeedbackCreateForm from "@/modules/feedback/forms/FeedbackCreateForm";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    export default {
        name: 'Feedback',
        components: {MenuSwitcher, FeedbackCreateForm, Modal},
        mixins: [modalHandler]
    }
</script>
