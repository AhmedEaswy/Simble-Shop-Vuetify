<template>
<div>
  <div v-if="isAuthenticated">
    <v-container fluid>
      <v-layout column>
        <v-card>
          <v-form
            ref="userForm"
            v-model="valid"
            lazy-validation
          >
            <v-card-text>
              <v-flex class="mb-4">
                <v-avatar size="96" class="mr-4">
                  <img :src="userForm.image" alt="Avatar">
                </v-avatar>
              </v-flex>
              <v-text-field
                v-model="userForm.name"
                :rules="nameRules"
                required
                label="Name"></v-text-field>
              <v-text-field
                v-model="userForm.email"
                :rules="emailRules"
                required
                label="Email"></v-text-field>
              <v-text-field
                v-model="userForm.phone"
                :rules="phoneRules"
                required
                :counter="11"
                label="Phone"></v-text-field>
              <v-text-field
                v-model="userForm.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                suggested="current-password"
                hint="At least 8 characters"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-card-text>
            <div class="mr-4 ml-4">
              <v-alert
                dense
                text
                type="error"
                v-if="errMessage"
                v-text="errMessage"
              ></v-alert>
              <v-alert
                dense
                outlined
                type="success"
                v-if="successMessage"
                v-text="successMessage"
              >
              </v-alert>
            </div>
            <div class="ma-2">
              <v-card-actions>
                <v-btn color="primary" :disabled="!valid" :loading="logProccess" @click="update">
                  <v-icon left dark>mdi-check</v-icon>
                  Save Changes
                </v-btn>
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </v-layout>
    </v-container>

  </div>
  <div v-else>
    <v-sheet
      :color="`grey ${isDark ? 'darken-2' : 'lighten-4'}`"
      class="pa-lg-5"
    >
      <v-skeleton-loader
        class="mx-auto"
        max-width="80%"
        height="100vh"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
</div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "profile",
  data: () => {
    return {
      loading: false,
      valid: true,
      show1: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length > 3) || 'Name must be more than 3 characters',
      ],
      // userForm: {
      //   name: this.user.name,
      //   phone: this.user.phone,
      //   email: this.user.email,
      //   password: this.user.password,
      // },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Min 6 characters',
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => v.length === 11 || 'Phone must be 11 characters'
        // v => (v.length !== 11) || 'Phone must be 11 characters',
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 6) || 'Min 6 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
  computed : {
    ...mapGetters({
      isAuthenticated: "authModule/isAuthenticated",
      userForm: "authModule/StateUser",
      isDark: "themeModule/isDark",
      errMessage: "authModule/errorMessage",
      successMessage: "authModule/successMessage",
      logProccess: "authModule/logProccess"
    }),


  },
  methods: {
    async update() {
      if (this.$refs.userForm.validate()) {
        await store.dispatch("authModule/updateProfile", this.userForm);
      } else {
        this.$refs.userForm.validate();
      }
    },
  },
  // beforeMount() {
  //   store.dispatch("authModule/checkAuthGuard");
  // },
};
</script>

<style scoped>

</style>
