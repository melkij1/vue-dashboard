<template>
  <div class="col-md-3">
    <div class="card">
      <div class="card-header card-header-primary">
        <h4 class="card-title">Авторизация</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitHandler">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group bmd-form-group">
                <label class="bmd-label-floating">Email</label>
                <input 
                  type="email" 
                  class="form-control"
                  v-model.trim="email"
                  :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                >
                <span 
                  class="invalid"
                  v-if="$v.email.$dirty && !$v.email.required">Поле email не должно быть пустым</span>

                  <span 
                  class="invalid"
                  v-if="$v.email.$dirty && !$v.email.email">Введите коректный email</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group bmd-form-group">
                <label class="bmd-label-floating">Пароль</label>
                <input 
                  type="password" 
                  class="form-control"
                  v-model.trim="password"
                  :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <span 
                  class="invalid"
                  v-if="$v.password.$dirty && !$v.password.required">Поле пароль не должно быть пустым</span>
                  <span 
                  class="invalid"
                  v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</span>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary pull-full">Войти</button>
          <div class="clearfix"></div>
          <p class="info-text-form">Нет аккаунта? <router-link to="/register">ЗАРЕГИСТРИРОВАТЬСЯ</router-link></p>
        </form>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
  .content {
    display: flex;
    justify-content: center;
    margin: 150px 0px;
  }
</style>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';
import message from '../utils/message.js';
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted(){ 
    if(this.$router.history.current.query.message === 'logout'){
      this.$notify({
        group: 'foo',
        type: 'success',
        text: 'Вы вышли из системы'
      })
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e){}
      
    }
  }
}
</script>