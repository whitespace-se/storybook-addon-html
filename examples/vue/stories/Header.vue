<template>
  <header>
    <div class="wrapper">
      <div>
        <svg
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1228.8 0H2048v2048h-819.2V0z" fill="#f7b219" />
          <circle r="409.6" transform="translate(819.2 409.6)" fill="#215da5" />
          <path
            d="M0 819.2A1228.8 1228.8 0 011228.8 2048H409.6A409.6 409.6 0 000 1638.4z"
            fill="#ff5001"
          />
        </svg>
        <h1>Whitespace</h1>
      </div>
      <div>
        <my-button
          size="small"
          @onClick="onLogout"
          label="Log out"
          v-if="user"
        />
        <my-button
          size="small"
          @onClick="onLogin"
          label="Log in"
          v-if="!user"
        />
        <my-button
          primary
          size="small"
          @onClick="onCreateAccount"
          label="Sign up"
          v-if="!user"
        />
      </div>
    </div>
  </header>
</template>

<script>
import './header.css';
import MyButton from './Button.vue';

export default {
  name: 'my-header',

  components: { MyButton },

  props: {
    user: {
      type: Object,
    },
  },

  methods: {
    onLogin() {
      this.$emit('onLogin');
    },
    onLogout() {
      this.$emit('onLogout');
    },
    onCreateAccount() {
      this.$emit('onCreateAccount');
    },
  },
};
</script>
