<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Фамилия:</label>
        <input type="text" id="name" placeholder="Иванов" v-model="name" :class="{ 'has-error': hasError }" required>
      </div>
      <div>
        <label for="address">Адрес:</label>
        <input type="text" id="address" placeholder="Пушкина 10-50" v-model="address" :class="{ 'has-error': hasError }" required>
      </div>
      <div>
        <label for="city">Населенный пункт:</label>
        <select id="city" v-model="city" :class="{ 'has-error': hasError }" required>
          <option value="" disabled hidden>Выберите населенный пункт</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
      </div>
      <div v-if="hasError" class="error-message">
        Вы ввели неправильные данные.
      </div>
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      address: '',
      city: '',
      cities: [
        { id: 1, name: 'строчково' },
        { id: 2, name: 'серково' },
        { id: 3, name: 'деревни' }
      ],
      failedAttempts: 0,
      hasError: false,
    };
  },
  methods: {
    async submitForm() {
      //не удачный способ вызова, лучше делать через id
      const selectedCity = this.cities.find(city => city.id === this.city);
      const userData = {
        //city: this.city,
        //продолжение неудачного вызова
        city: selectedCity.name,
        address: this.address,
        name: this.name,
      };
      try {
        const response = await axios.get('http://localhost:3309/users', {params:userData});
        if (response.status === 200) {
          this.$router.push('/success');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          if (this.failedAttempts <= 9) {
            this.failedAttempts++;
            this.hasError = true;
            console.error(error);
          } else {
            this.$router.push('/not-found');
          }
        } else {
          console.error(error);
        }
      }
    }
  }
};
export const cities = [
  { id: 1, name: 'строчково' },
  { id: 2, name: 'серково' },
  { id: 3, name: 'деревни' }
];
</script>
<style>
.has-error {
  border-color: red;
}
.error-message {
  color: red;
}
label {
  color: white;
  font-family: "Times New Roman";
}
body{
  background: linear-gradient(#00BFFF, #30d5c8) fixed;
  text-shadow: 0px 0px 4px #000000;
  font-family: "Times New Roman";
  font-size: 25px;
  }
</style>