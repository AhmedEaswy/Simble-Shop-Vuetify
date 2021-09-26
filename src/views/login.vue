<script src="../../../podcast/src/store/index.js"></script>
<template>
  <div>
    <v-card style="padding: 20px">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
<!--        <v-text-field-->
<!--          v-model="name"-->
<!--          :counter="10"-->
<!--          :rules="nameRules"-->
<!--          label="Name"-->
<!--          required-->
<!--        ></v-text-field>-->

        <v-text-field
          v-model="loginForm.email"
          :rules="emailRules"
          label="E-mail"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="loginForm.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          outlined
          @click:append="show1 = !show1"
        ></v-text-field>
<!--        <v-select-->
<!--          v-model="select"-->
<!--          :items="items"-->
<!--          :rules="[v => !!v || 'Item is required']"-->
<!--          label="Item"-->
<!--          required-->
<!--        ></v-select>-->

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>
        <p color="red--text">{{ errMessage }}</p>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submit"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "login",
  data: () => ({
    valid: true,
    name: '',
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    // errorMessage: store.state["authModule/errorMessage"],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    loginForm: {
      email: '',
      password: '',
    },

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  }),

  computed: {
    ...mapGetters({isAuthenticated: "authModule/isAuthenticated", errMessage: "authModule/errorMessage"}),
  },

  methods: {
    ...mapActions(["authModule/LogIn"]),
    async submit() {
      if (this.$refs.form.validate()) {
        // const User = new FormData();
        // User.append("email", this.loginForm.email);
        // User.append("password", this.loginForm.password);
        try {
          await store.dispatch("authModule/LogIn", this.loginForm);
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$refs.form.validate();
      }
    },
  },
  beforeCreate() {
    if (localStorage.getItem("user-token")) {

    }
  }
};
</script>

<style scoped>

</style>
