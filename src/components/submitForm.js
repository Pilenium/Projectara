import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      address: '',
      city: '',    
    };
  },
  methods: {
    submitForm() {
      axios.get('http://localhost:3309/users', {
        city: this.city,  
        address: this.address,
        name: this.name,
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