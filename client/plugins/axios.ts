import axios from "axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  axios.defaults.withCredentials = true;
});
