<template>
    <div>
      <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">content_copy</i>
                  </div>
                  <p class="card-category">Used Space</p>
                  <h3 class="card-title">49/50
                    <small>GB</small>
                  </h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons text-danger">warning</i>
                    <a href="javascript:;">Get More Space...</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">store</i>
                  </div>
                  <p class="card-category">Revenue</p>
                  <h3 class="card-title">$34,245</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">date_range</i> Last 24 Hours
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">info_outline</i>
                  </div>
                  <p class="card-category">Fixed Issues</p>
                  <h3 class="card-title">75</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">local_offer</i> Tracked from Github
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-twitter"></i>
                  </div>
                  <p class="card-category">Followers</p>
                  <h3 class="card-title">+245</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">update</i> Just Updated
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="top-content">
              <div class="col-md-3"></div>
              <div class="col-md-3"></div>
              <div class="col-md-3"></div>
              <div class="col-md-3">
                <div class="top-content__item btns">
                  <button type="button" class="btn add-btn-task"
                  @click="$emit('createtask')">Добавить</button>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card">
                <div class="card-body table-responsive">
                  <table class="table table-hover">
                    <thead class="text-warning">
                      <th></th>
                      <th>Название</th>
                      <th>Срок</th>
                      <th>Приоритет</th>
                      <th>Категория</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr v-for="(task,index) in filtered">
                        <td>{{index + 1}}</td>
                        <td>{{task.title}}</td>
                        <td>{{task.date}}</td>
                        <td>{{task.priority.title}}</td>
                        <td @click="setcurrentCategory(task.categoryId)">
                          <router-link :to="{path:'/category/'+ task.categoryId.id}"
                          >
                            {{task.categoryId.title}}
                          </router-link>
                        </td>
                        <td>
                          <span class="material-icons">delete</span>
                        </td>
                        <td>
                          <div class="material-icons">edit</div>
                        </td>
                        <td>
                          <div class="form-check">
                            <label class="form-check-label">
                              <input class="form-check-input" type="checkbox" value=""
                              >
                              <span class="form-check-sign">
                              <span class="check"></span>
                            </span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  name: 'Category',
  props: {
    tasksArray: Array,
  },
  computed: {
    ...mapGetters([
      'categoryActive'
    ]),
    taskFilter(){
      if(this.$router.history.current.fullPath === '/'){
        return this.tasksArray
      }else if(this.$router.history.current.params.id !== ''){
        let id = this.$router.history.current.params.id
        return this.tasksArray.filter(x => (x.categoryId.id === id))
      }
    }
  },
  mounted() {
    this.filtered()
  },
  methods: {
    ...mapActions([
      'setCurrentCategory'
    ]),
    setcurrentCategory(val) {
      console.log(val,'vv')
      this.setCurrentCategory(val)
      this.$emit('setcategory', val)
      this.filtered()
    },

    filtered(arr) {
      console.log(this.$router.history.current.fullPath)
      if(this.$router.history.current.fullPath === '/'){
        return arr
      }else if(this.$router.history.current.params.id !== ''){
        let id = this.$router.history.current.params.id
        const list = arr.filter(x => ( x.categoryId.id === id))
        return list
      }
      console.log(this.$router.history.current.params.id , this.tasksArray)
    }
  }

}
</script>