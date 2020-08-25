<template>
  <div class="modal-wrapper"
  :class="{isOpen: openTask === true}">
    <div class="modal-ovarlay"></div>
    <div id="taskModal" class="modal new-modal">
      <div class="modal-content">
        <h4>Добавить задачу</h4>
        <form @submit.prevent="submitHandler">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group bmd-form-group">
                <label class="bmd-label-floating">Название</label>
                <input type="text" class="form-control"
                v-model.trim="name"
                :class="{invalid: $v.name.$dirty && !$v.name.required }">
                <span 
                  class="invalid"
                  v-if="$v.name.$dirty && !$v.name.required">Поле не должно быть пустым</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group form-group__select bmd-form-group">
                <label class="bmd-label-floating">Укажите категорию</label>
                <v-select :options="categories"
                v-model="category"
                required
                label="title"></v-select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group form-group__select  bmd-form-group">
                <label class="bmd-label-floating">Укажите приоритет</label>
                <v-select :options="prioriryArray"
                v-model="priority"
                label="title"></v-select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group form-group__select  bmd-form-group">
                <label class="bmd-label-floating">Укажите срок выполнения</label>
                <Datepicker :language="ru" v-model="date" :format="customFormatter"/>
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
import Datepicker from 'vuejs-datepicker';
import {ru} from 'vuejs-datepicker/dist/locale'
import { mapGetters } from 'vuex';
import moment from 'moment'
export default {
  name: 'CategoryModal',
  props: {
    openTask: Boolean,
    categories: Array
  },
  components:{
    Datepicker
  },
  data:() => ({
    category: '',
    flagModal: undefined,
    newCategories: [],
    ru: ru,
    name: '',
    category: '',
    priority: '',
    date: '',
  }),
  mounted() {
    console.log(this.categories,'categories')
  },
  created() {
    this.flagModal = this.openTask
  },
  validations: {
    name: {required}
  },
  computed: {
    ...mapGetters([
      'prioriryArray'
    ])
  },
  methods: {
    customFormatter(date) {
      return moment(date).format('DD-MM-yyyy');
    },
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

    
      let testdate = moment(this.date).format('DD-MM-yyyy')
      try {
        const newTask = await this.$store.dispatch('createTask', {
          title: this.name,
          categoryId: this.category,
          priority: this.priority,
          date: moment(this.date).format('DD-MM-yyyy'),
          checked: false
        })
        this.name = '',
        this.category = '',
        this.priority = '',
        this.date = '',
        this.$v.$reset()
        this.$notify({
          group: 'foo',
          type: 'success',
          text: 'Задача была создана'
        })
        this.$emit('closeModal')
        console.log(newTask,'task')
        this.$emit('created', newTask)
      } catch (e) {

      }
      //console.log(this.name, this.category, this.priority, testdate ,'info form')
      // try {
      //   const newCategory = await this.$store.dispatch('createCategory', {
      //     title: this.category
      //   })
      //   this.flagModal = false
      //   this.category = ''
      //   this.$v.$reset()
      //   this.$notify({
      //     group: 'foo',
      //     type: 'success',
      //     text: 'Категория была создана'
      //   })
      //   this.$emit('closeModal')
      //   this.$emit('created', newCategory)
      // } catch(e){}
      
    }
  }
}
</script>