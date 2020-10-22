<template>
  <v-app>
    <v-container
      id="signup"
      fluid
      tag="section"
      class="signup-container"
    >
      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        color="error"
        top
      >
        {{ signupError }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-row
        align="center"
        justify="center"
        class="signup-row"
      >
        <v-col cols="4">
          <base-material-card color="deep-purple lighten-1">
            <template v-slot:heading>
              <div class="display-2 font-weight-light text-center">
                <v-icon>mdi-peace</v-icon>
                <b>Raisely</b>
              </div>

              <div class="subtitle-1 font-weight-light text-center">
                The Future of Fundraising
              </div>
            </template>

            <v-card-text>
              <v-container
                class="pa-0"
                fluid
              >
                <v-row
                  align="center"
                  class="mb-n8"
                >
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="signup.firstName"
                      label="First Name"
                      append-icon="mdi-account-tie"
                      filled
                      rounded
                      dense
                      color="deep-purple lighten-1"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  align="center"
                  class="mb-n8"
                >
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="signup.lastName"
                      label="Last Name"
                      append-icon="mdi-draw"
                      filled
                      rounded
                      dense
                      color="deep-purple lighten-1"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  align="center"
                  class="mb-n8"
                >
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="signup.email"
                      label="Email"
                      :rules="emailRules"
                      append-icon="mdi-email-outline"
                      filled
                      rounded
                      dense
                      color="deep-purple lighten-1"
                      @blur="checkIfUserExists()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mb-n12">
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="signup.password"
                      label="Password"
                      type="password"
                      :rules="passwordRules"
                      append-icon="mdi-account-lock-outline"
                      filled
                      rounded
                      dense
                      color="deep-purple lighten-1"
                      @keyup.enter="signupUser()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mb-n5">
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-checkbox
                      v-model="agreement"
                      label="I am signing up on behalf of a registered charity, non-profit, community group or business."
                    >
                    </v-checkbox>
                  </v-col>
                </v-row>
                <div class="my-2 text-center">
                  <v-btn
                    outlined
                    color="deep-purple lighten-1"
                    @click="signupUser()"
                    :disabled="!agreement || !signup.email || !signup.password || typeof emailRules[1](signup.email) === 'string' || typeof passwordRules[1](signup.password) === 'string'"
                  >
                    Register
                  </v-btn>
                </div>
              </v-container>
            </v-card-text>
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import { signup, checkUser } from '../providers/auth.js'
  import validations from '../providers/validation.js'
  export default {
    data: () => ({
      snackbar: false,
      agreement: false,
      signupError: undefined,
      signup: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
      },
      emailRules: validations.emailRules,
      passwordRules: validations.passwordRules,
    }),

    methods: {
      signupUser () {
        const body = {
          campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          data: this.signup
        }
        signup(body).then(res => {
          this.$router.push(`/${res.uuid}/raisely`)
        }).catch(err => {
          this.signupError = err
          this.snackbar = true
        })
      },

      checkIfUserExists () {
        const body = {
          campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          data: {
            email: this.signup.email
          }
        }
        checkUser(body).catch(err => {
          this.signupError = err
          this.snackbar = true
        })
      },
    },
  }
</script>

<style lang="scss">
.signup-container {
  background: url(../assets/bg.png) no-repeat center bottom;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
