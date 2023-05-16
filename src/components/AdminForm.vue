<template>
  <div class="admin-form">
    <form @submit.prevent="reqforadmin">
      <div class="form-group">
        <label for="name">Фамилия:</label>
        <input type="text" id="name" placeholder="Иванов" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" id="address" placeholder="Пушкина 10-50" v-model="address" required>
      </div>
      <div class="form-group">
        <label for="city">Населенный пункт:</label>
        <select id="city" v-model="city">
          <option value="" disabled hidden>Выберите населенный пункт</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>

      </div>
      <div class="form-group">
        <label for="counter">Ваш паспортный номер счётчика:</label>
        <input type="text" id="counter" placeholder="0103023012А12" v-model="counter" required>
      </div>
      <div class="form-group">
        <label for="seal">Номер пломбы если есть:</label>
        <input type="text" id="seal" placeholder="06223317" v-model="seal" required>
      </div>
      <div class="form-group">
        <label for="phone">Ваш контактный номер:</label>
        <input type="tel" id="phone" placeholder="88005553535" v-model="phone" required>
      </div>
      <div class="form-group">
        <label for="problem">Общее описание проблемы:</label>
        <br>
        <textarea id="problem" placeholder="Тут можно в целом описать проблему например:&#10;1)Вы неправильно указали мою Фамилию&#10;2)Не правильно указан адрес&#10;3)Я не могу найти себя" v-model="problem" required></textarea>
      </div>
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import { cities } from '@/components/UserForm.vue';
import { ref } from 'vue';
import axios from 'axios';
import router from '../router.js';
import XLSX from 'xlsx';

export default {
  setup() {
    const name = ref('');
    const address = ref('');
    const city = ref('');
    const counter = ref('');
    const seal = ref('');
    const phone = ref('');
    const problem = ref('');

    const reqforadmin = () => {
      axios.post('/api/add-user-data', {
        name: name.value,
        address: address.value,
        city: city.value,
        counter: counter.value,
        seal: seal.value,
        phone: phone.value,
        problem: problem.value,
      }).then(response => {
        console.log(response.data);

        // Создание новой книги, если файла не существует
        let workbook;
        try {
          workbook = XLSX.readFile('existing_file.xlsx');
        } catch {
          workbook = XLSX.utils.book_new();
        }

        // Получение листа книги и добавление новых данных
        const worksheet = workbook.Sheets['Лист1'] || XLSX.utils.sheet_add_aoa(workbook.Sheets, [['Имя', 'Адрес', 'Город', 'Счётчик', 'Пломба', 'Телефон', 'Проблема']], {header: 1});
        const lastRow = worksheet['!rows'] ? worksheet['!rows'].length : 0;
        const newRow = [name.value, address.value, city.value, counter.value, seal.value, phone.value, problem.value];
        newRow.forEach((cell, i) => {
          worksheet[XLSX.utils.encode_cell({r: lastRow + 1, c: i})] = {t: 's', v: cell};
        });

        // Сохранение изменений в файл
        XLSX.writeFile(workbook, 'existing_file.xlsx');

        // Оповещение пользователя и перенаправление на главную страницу
        alert('Данные доставлены для обработки. Ожидайте изменений в течение 1 рабочей недели.');
        router.push('/');
      }).catch(error => {
        console.log(error);
      });
    }

    return {
      name,
      address,
      city,
      cities: cities,
      counter,
      seal,
      phone,
      problem,
      reqforadmin
    }
  }
}
</script>
<style scoped>
.admin-form {
  max-width: 50%;
  margin: 0 auto;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 2px solid #b10000;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgb(0, 0, 0);
}

.form-group label {
  display: block;
  width: 100%;
  text-align: left;
  margin-right: 0px;
}
.form-group textarea {
  display: block;
  width: 150%;
  height: 150%;
  text-align: left;
  margin-right: 0px;
}
</style>