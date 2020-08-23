<template>
  <div class="modal-wrapper">
    <div id="categoryModal" class="modal new-modal">
      <div class="modal-content">
        <h4>Добавление категории</h4>
        <form>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group bmd-form-group">
                <label class="bmd-label-floating">Название</label>
                <input type="text" class="form-control">
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryModal'
}
</script>