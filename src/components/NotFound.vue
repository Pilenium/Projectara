<template>
  <div class="form-group">
    <br>
    <label class="form-group2">К сожалению, данные пользователя не найдены! Пожалуйста, заполните формы ниже чтобы отправить заявку на проверку. Если ваши данные не будут найдены, тогда с вами свяжется человек, для уточнения информации. Если всё пройдёт успешно, значит ваши данные верны и они будут откорректированы в автоматическом порядке.</label>
    <br>
    <admin-form></admin-form>
    <br>
  </div>
</template>

<script>
import AdminForm from '@/components/AdminForm';
export default {
  components: {
    AdminForm
  }
}
</script>
<style scoped>
body{
  background: linear-gradient(#00BFFF, #30d5c8) fixed;
  text-shadow: 0px 0px 4px #000000;
  font-family: "Times New Roman";
  font-size: 25px;
  }
  .form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
  max-width: 75%;
  margin: 0 auto;
}
.form-group2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 2px solid #ffe600;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
  max-width: 75%;
  margin: 0 auto;
}

.form-group label {
  display: flex;
  text-align: justify;
  justify-content: center;
  max-width: 50%;
  margin: 0 auto;
}
</style>