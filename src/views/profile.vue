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
        <v-card class="mt-5">
          <v-data-table
            :headers="headers"
            :items="addresses"
            sort-by="calories"
            class="elevation-1"
            v-if="addresses"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>My Addresses</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      New Item
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              label="Name"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.city"
                              label="City"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.region"
                              label="Region"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.details"
                              label="Details"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.notes"
                              label="Notes"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              No DATA
            </template>
          </v-data-table>
<!--          <v-simple-table>-->
<!--            <template v-slot:default>-->
<!--              <thead>-->
<!--              <tr>-->
<!--                <th class="text-left">-->
<!--                  Name-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  City-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Region-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Details-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Notes-->
<!--                </th>-->
<!--                <th class="text-left">-->
<!--                  Actions-->
<!--                </th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr-->
<!--                v-for="item in addresses"-->
<!--                :key="item.id"-->
<!--              >-->
<!--                <td>{{ item.name }}</td>-->
<!--                <td>{{ item.city }}</td>-->
<!--                <td>{{ item.region }}</td>-->
<!--                <td>{{ item.details }}</td>-->
<!--                <td>{{ item.notes }}</td>-->
<!--                <td>-->
<!--                  -->
<!--                  <v-icon>mdi-edit</v-icon>-->
<!--                </td>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--            </template>-->
<!--          </v-simple-table>-->
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

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'City', value: 'city' },
        { text: 'Region', value: 'region' },
        { text: 'Details', value: 'details' },
        { text: 'Notes', value: 'notes' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // headers: [
      //   { text: 'Name', value: 'name' },
      //   { text: 'City', value: 'city' },
      //   { text: 'Region', value: 'region' },
      //   { text: 'Details', value: 'details' },
      //   { text: 'Notes', value: 'notes' },
      //   { text: 'Actions', notes: 'actions', sortable: false },
      // ],
      editedIndex: -1,
      editedItem: {
        name: null,
        city: null,
        region: null,
        details: null,
        notes: null,
      },
      defaultItem: {
        name: null,
        city: null,
        region: null,
        details: null,
        notes: null,
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
      logProccess: "authModule/logProccess",
      addresses: "authModule/Addresses/addresses",
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    async update() {
      if (this.$refs.userForm.validate()) {
        await store.dispatch("authModule/updateProfile", this.userForm);
      } else {
        this.$refs.userForm.validate();
      }
    },

    editItem (item) {
      this.editedIndex = this.addresses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.addresses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.addresses.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.addresses[this.editedIndex], this.editedItem)
      } else {
        this.addresses.push(this.editedItem)
        // store.dispatch("authModule/Addresses/addAddresses", this.editedItem)
      }
      this.close()
    },
  },
  // beforeMount() {
  //   store.dispatch("authModule/checkAuthGuard");
  // },
};
</script>

<style scoped>

</style>
