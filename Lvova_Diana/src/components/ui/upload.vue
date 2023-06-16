<template>
  <div class="file-input mb15">
    <input
      type="file"
      ref="file"
      accept=".jpg, .jpeg, .png"
      @change="previewFiles"
    />
    <vs-row>
      <div class="file-input__preview" v-if="preview.name">
        <vs-icon icon="file_present" @click="resetFile()"></vs-icon>
        <div class="file-input__preview__info">
          <p>{{ preview.name.substr(0, 32) }} ({{ preview.size }})</p>
          <vs-progress :height="2" :percent="progress" color="primary"></vs-progress>
        </div>
      </div>
      <vs-button icon="cloud_upload" type="flat" @click="changeFile()" v-else>
        Выберите файл
      </vs-button>
    </vs-row>
  </div>
</template>

<script>
export default {
  props: {
    id_doc: {
      type: Number,
      requierd: true
    }
  },
  data() {
    return {
      preview: {
        name: "",
        size: "",
        src: null
      },
      progress: 0
    };
  },
  methods: {
    changeFile() {
      this.$refs.file.click();
    },
    resetFile() {
      this.preview = {
        name: "",
        size: "",
        src: null
      };
    },
    // prettier-ignore
    previewFiles() {
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();
      var than    = this;

      reader.onprogress = function(data) {
          if (data.lengthComputable) {
              than.progress = parseInt( ((data.loaded / data.total) * 100), 10 );
              console.log(than.progress);
          }
      }

      reader.onloadend = function () {
        than.preview.src = reader.result;
        than.result();
      }

      if (file) {
        this.preview.name = file.name;
        this.preview.size = Math.floor(file.size / 1024) + "кб";
        reader.readAsDataURL(file);
      } else {
        this.preview.src = "";
      }
    },
    result() {
      this.$emit("result", this.preview);
    }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.file-input {
  display: flex;
  align-items: flex-start;
}
.file-input input {
  display: none !important;
}

.file-input__preview {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 10px 0;
}
.file-input__preview img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.file-input__preview p {
  font-size: 12px;
}
</style>
