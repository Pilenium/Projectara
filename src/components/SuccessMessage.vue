<template>
  <div>
    <template v-if="isSameDomain">
      <div class="form-group2">
      <label>Данные пользователя найдены.<br>Перенаправляем вас на страницу передачи показаний...</label>
      </div>
    </template>
    <template v-else>
      <div class="form-group1">
      <label>Для доступа к этой странице вам необходимо авторизоваться!!!</label>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    // Get the referrer URL of the page
    const referrerUrl = document.referrer;
    
    // Check if the referrer is from the same domain
    const isSameDomain = referrerUrl.startsWith(window.location.origin);
    
    // Redirect only if the referrer is from the same domain
    if (isSameDomain) {
      setTimeout(() => {
        this.$router.push('/submitform');
      }, 3000);
    }else setTimeout(() => {
            this.$router.push('/');
          }, 3000);
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
  .form-group1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  border: 5px solid #ff0000;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
  width: 50%;
  height: 50%;
  margin: auto;
}
.form-group2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  border: 5px solid #73ff00;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
  width: 50%;
  height: 50%;
  margin: auto;
}

.form-group label {
  display: flex;
  justify-content: center;
  font-weight: bold;
  text-align: center;
}
</style>