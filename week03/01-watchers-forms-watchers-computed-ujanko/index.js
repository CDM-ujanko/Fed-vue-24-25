const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      isValid: false,
      submitted: false,
      occupations: [
        // Make up some occupations
      ],
      form: {
        firstName: '',
        lastName: '',
        dob: '',
        occupation: '',
        terms: false
      }
    }
  },

  mounted() { },

  watch: {
    form: {
      deep: true,
      handler(f) {
        console.log('Form change!', f, this.form)
        this.isValid =
          f.firstName.length > 0 &&
          f.lastName.length > 0 &&
          f.dob.length > 0 &&
          f.occupation.length > 0 &&
          f.terms;
      }
    }
  },

  computed: {},

  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log(JSON.stringify(this.form));
      this.submitted = true;
    }
  }
});

app.mount('#vue-app');