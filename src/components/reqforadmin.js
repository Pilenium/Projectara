import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      address: '',
      counterNumber: '',
      sealNumber: '',
      contactPhone: '',
      problemDescription: '',
    };
  },
  methods: {
    submitForm() {
      axios.post('/api/check-user-data', {
        name: this.name,
        address: this.address,
        counterNumber: this.counterNumber,
        sealNumber: this.sealNumber,
        contactPhone: this.contactPhone,
        problemDescription: this.problemDescription,
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};