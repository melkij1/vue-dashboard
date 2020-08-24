<template>
  <div class="modal-wrapper"
  :class="{isOpen: openCategory === true}">
    <div class="modal-ovarlay"></div>
    <div id="categoryModal" class="modal new-modal">
      <div class="modal-content">
        <h4>Добавление категории</h4>
        <form @submit.prevent="submitHandler">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group bmd-form-group">
                <label class="bmd-label-floating">Название</label>
                <input type="text" class="form-control"
                v-model.trim="category"
                :class="{invalid: $v.category.$dirty && !$v.category.required }">
                <span 
                  class="invalid"
                  v-if="$v.category.$dirty && !$v.category.required">Поле не должно быть пустым</span>
              </div>
            </div>
          </div>
          <div class="form-btn">
            <button type="submit" class="btn btn-submit">Добавить</button>
            <button type="button" class="btn btn-close" @click="$emit('closeModal')">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';
export default {
  name: 'CategoryModal',
  props: {
    openCategory: Boolean
  },
  data:() => ({
    category: '',
    flagModal: undefined
  }),
  created() {
    this.flagModal = this.openCategory
  },
  validations: {
    category: {required}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      try {
        const newCategory = await this.$store.dispatch('createCategory', {
          title: this.category
        })
        this.flagModal = false
        this.category = ''
        this.$v.$reset()
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'Категория была создана'
        })
        this.$emit('closeModal')
        this.$emit('created', newCategory)
      } catch(e){}
      
    }
  }
}
</script>