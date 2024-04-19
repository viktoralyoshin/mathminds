// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.scss"],
  colorMode: {
    preference: "light",
  },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      login: "/login",
      callback: "/"
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_variables.scss" as *;',
        },
      },
    },
  },
});
