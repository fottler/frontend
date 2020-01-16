<template>
    <file-upload
            :headers="headers"
            :post-action="apiUrl"
            :extensions="config.allowedExtensions"
            :accept="config.accept"
            :size="config.maxSize"
            ref="upload"
            @input-file="inputFile">

        <div class="upload-image">
            <img v-if="value"
                 :src="imageUrl"
                 alt="Загрузка изображения">
        </div>
    </file-upload>
</template>

<script>
    import FileUpload from 'vue-upload-component'
    import Config from "@/config/Config";
    import ServerRequest from "@/core/ServerRequest";

    export default {
        name: 'UploadImage',
        components: {FileUpload},
        props: {
            value: String,
            folderUrl: String,
            apiUrl: String
        },
        computed: {
            headers(){
                return {
                    Authorization: ServerRequest.headers.Authorization
                };
            },
            imageUrl(){
                return this.folderUrl+'/'+this.value;
            },
            config: ()=>Config.imageUpload
        },
        methods: {
            inputFile: function (newFile, oldFile) {
                // auto upload file
                if(Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error){
                    if (!this.$refs.upload.active) {
                        this.$refs.upload.active = true
                    }
                }

                // Update file
                if(newFile && oldFile){
                    //todo add progress bar

                    if (newFile.active && !oldFile.active) {
                        this.$emit('before-upload');
                    }

                    // Upload error
                    if (newFile.error !== oldFile.error) {
                        const errorMessage = Config.imageUpload.errorMessages;

                        if(errorMessage.hasOwnProperty(newFile.error)){
                            this.$emit('error', errorMessage[newFile.error]);
                        }
                    }

                    // Uploaded successfully
                    if (newFile.success !== oldFile.success) {
                        this.$emit('input', newFile.response.fileName);//newFile.file.name
                    }
                }
            }
        }
    }
</script>
