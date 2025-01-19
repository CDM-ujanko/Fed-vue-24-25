<template>
    <div>
        <div class="modal "
             tabindex="-1"
             :class="{ show: isOpen }">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Select File</h5>
                        <button type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <div class="mb-3">
                                <label for="picture">Upload New File</label>
                                <input type="file"
                                       class="form-control"
                                       id="picture"
                                       @change="onPictureChange"
                                       accept="image/png, image/jpeg">
                            </div>
                            <div>
                                <button type="button"
                                        :disabled="!picture"
                                        class="btn btn-primary"
                                        @click="uploadImage">Upload</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                                <img v-for="img in images"
                                     @click="selectImage(img)"
                                     :src="$api + img"
                                     class="img-thumbnail image"
                                     alt="Image">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">

                        <button type="button"
                                @click="close"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                        <button type="button"
                                class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <button @click="open"
                class="btn btn-primary">Select File</button>


    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FilePicker',
    props: ['modelValue'],
    emits: ['update:modelValue'],

    data() {
        return {
            isOpen: false,
            loading: false,
            picture: null,
            images: [],
        }
    },

    mounted() {
        this.getImages();
    },

    methods: {
        open() {
            this.isOpen = true;
        },

        close() {
            this.isOpen = false;
        },

        selectImage(src) {
            this.$emit('update:modelValue', src)
            this.close();
        },

        onPictureChange(e) {
            let files = e.target.files || e.dataTransfer.files;

            if (!files.length) {
                return;
            }

            this.picture = files[0]
        },

        getImages() {
            this.loading = true;
            axios.get(this.$api + '/gallery')
                .then(resp => {
                    this.images = resp.data;
                }).catch((e) => {
                    console.error(e)
                }).finally(() => {
                    this.loading = false;
                })
        },

        uploadImage() {
            this.loading = true;
            axios.post(this.$api + '/upload',
                { picture: this.picture }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                this.images.unshift(res.data);
                this.picture = null;
            }).catch((e) => {
                console.error(e)
            }).finally(() => {
                this.loading = false;
            })

        }
    }
}
</script>

<style scoped>
.image {
    object-fit: cover;
    width: 230px;
    height: 230px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
}

.modal.show {
    display: block !important;
}
</style>