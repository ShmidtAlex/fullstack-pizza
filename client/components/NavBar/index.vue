<template>
  <!--  Todo: rewrite with 'clean code' principles priority: low-->
  <div class="navbar-container shadow-sm bg-white">
    <div class="logo">
      <img
        src="../daddy-jones.svg"
        alt="daddy jones logo"
        class="logo-daddy-jones"
      />
    </div>
    <ul v-if="showMenu" class="navbar-container__menu">
      <li class="navbar-container__menu-item font-bold">
        <NuxtLink to="/products">Pizza</NuxtLink>
      </li>
      <!--<li class="navbar-container__menu-item font-bold"><NuxtLink to="/combo">Combo</NuxtLink></li>-->
      <!--<li class="navbar-container__menu-item font-bold"><NuxtLink to="/snacks">Snacks</NuxtLink></li>-->
      <!--<li class="navbar-container__menu-item font-bold"> <NuxtLink to="/salads">Salads</NuxtLink></li>-->
      <!--<li class="navbar-container__menu-item font-bold"><NuxtLink to="/desserts">Desserts</NuxtLink></li>-->
      <!--<li class="navbar-container__menu-item font-bold"><NuxtLink to="/souses">Sauces</NuxtLink></li>-->
      <!--<li class="navbar-container__menu-item font-bold"><NuxtLink to="/hot-meals">Hot meals</NuxtLink></li>-->
    </ul>
    <div v-else class="main-view">
      <div class="city_block">
        <label for="city-option">{{ City }}</label>
        <select id="city-option" v-model="City" name="city" class="region">
          <option value="Munich">Munich</option>
          <option value="Berlin">Berlin</option>
          <option value="Frankfurt">Frankfurt</option>
        </select>
      </div>

      <div class="menu-list">
        <ul>
          <NuxtLink class="font-bold" href=""><li>Menu</li></NuxtLink>
          <!-- what anchor if we are in the other component???-->
          <NuxtLink class="font-bold" href=""><li>Promotions</li></NuxtLink>
          <NuxtLink class="font-bold" href=""><li>Bonuses</li></NuxtLink>
          <NuxtLink class="font-bold" href=""><li>Contact us</li></NuxtLink>
        </ul>
      </div>
      <div class="phone-number">015 99-1234567</div>
    </div>
    <NuxtLink class="open-button" to="/auth">
      <div class="bg-[gray] text-white m-2 px-3 py-2 rounded-md text-sm text-white">
        Sign In
      </div>
    </NuxtLink>

      <NuxtLink class="open-button" to="/products">
        <div class="bg-[gray] text-white m-2 px-3 py-2 rounded-md text-sm text-white">Sign Out </div>
      </NuxtLink>
      <NuxtLink class="open-button" to="/registration">
        <div class="bg-[gray] text-white m-2 px-3 py-2 rounded-md text-sm text-white">Register</div>
      </NuxtLink>
    </div>
</template>
<script>
// import UserAccount from "../../modules/UserAccount/components/UserAccount/UserAccount";
export default {
  components: {
    // UserAccount,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
    isAuthForm: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {},
  data() {
    return {
      City: "Munich",
      isSignInFormShowed: false,
      change: false,
    };
  },
  methods: {
    showSignInForm() {
      ("worked 1");
      this.$emit("toggleAuthForm");
    },
  },
};
</script>
<style lang="scss">
.navbar-container {
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  padding: 20px;
  &__menu {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    &-item {
      list-style: none;
      display: flex;
      align-items: center;
      position: relative;
      font-weight: 700;
      color: #70544f;
      line-height: 1.33;
      height: 100%;
      a {
        text-decoration: none;
      }
    }
  }
}
.logo img {
  width: 100px;
  height: 40px;
}
//.menu-list,
//.main-view {
//  width: 60%;
//  height: 100%;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//}
//#city-option {
//  margin: 0 40px 0 10px;
//}
//.menu-list
//.menu-list a {
//  display: flex;
//  align-items: center;
//  height: 100%;
//  text-decoration: none;
//}
//.menu-list li {
//  list-style: none;
//  display: flex;
//  align-items: center;
//  position: relative;
//  font-weight: 700;
//  color: #70544f;
//  line-height: 1.33;
//  height: 100%;
//}

.language-option {
  margin: 0 0 0 0;
}

.phone-number {
  display: flex;
  align-items: center;
  min-width: fit-content;
  text-transform: uppercase;
  font-weight: 700;
  color: #70544f;
  line-height: 1.33;
  height: 100%;
  margin: 0 30px;
}
.user-account-section {
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 10px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: #006d54;
  padding: 10px;
  border-radius: 25px;
  background-color: whitesmoke;
  font-weight: 700;
}
.user-section-active {
  background-color: #f8f8f8;
  color: #bfb7b6;
}
</style>
