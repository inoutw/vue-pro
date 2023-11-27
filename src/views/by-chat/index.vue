<template>
  <v-stage :config="{ width: 500, height: 200 }">
    <v-layer>
      <v-rect :config="{ width: 500, height: 200, fill: '#f0f0f0' }"></v-rect>
      <v-group v-for="(item, index) in state.dataList" :key="index" :x="20" :y="40 + index * 30">
        <v-text :config="{ text: item.name, fontSize: 16 }"></v-text>
        <v-text :config="{ text: item.age, x: 120, fontSize: 16 }"></v-text>
        <v-text :config="{ text: item.city, x: 220, fontSize: 16 }"></v-text>
      </v-group>
      <v-line :config="{ points: [20, 30, 480, 30], stroke: 'black', strokeWidth: 2 }"></v-line>
      <v-line :config="{ points: [20, 60, 480, 60], stroke: 'black', strokeWidth: 2 }"></v-line>
      <v-line :config="{ points: [20, 90, 480, 90], stroke: 'black', strokeWidth: 2 }"></v-line>
    </v-layer>
  </v-stage>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
// We need to import the necessary dependencies for creating a router and checking route permissions
import { createRouter, createWebHistory } from 'vue-router';

// Define the routes for the router
// const routes = [
//   { path: '/', component: Home },
//   { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
//   { path: '/login', component: Login }
// ];

// Create the router instance

// We can add another route to our router that will display a 403 page if the user is not authorized to access a route that requires authentication.

// Define the 403 component
const Forbidden = { template: '<div>403 Forbidden</div>' };

// Add the 403 route to the router
// const routes = [
//   { path: '/', component: Home },
//   { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
//   { path: '/login', component: Login },
//   { path: '/forbidden', component: Forbidden } // Add this route for 403 Forbidden page
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });
// Modify the checkAuth function to redirect to the 403 page if the user is not authorized
function checkAuth(to, from, next) {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAuth && isAuthenticated) { // Add this condition to check if user is authorized
    next();
  } else {
    next('/forbidden'); // Redirect to 403 page if user is not authorized
  }
}

// Now, if a user tries to access a route that requires authentication but is not authorized, they will be redirected to the 403 Forbidden page.

// Add the checkAuth function as a global navigation guard
// router.beforeEach(checkAuth);

// Export the router instance

// ${INSERT_HERE} - We have created a router instance with routes and a global navigation guard that checks if the user is authorized to access a route. The checkAuth function is called before each navigation and redirects the user to the login page if they are not authenticated and trying to access a route that requires authentication.

  const state = reactive({
    dataList: [
        { name: 'John', age: 25, city: 'New York' },
        { name: 'Jane', age: 32, city: 'Los Angeles' },
        { name: 'Bob', age: 47, city: 'Chicago' }
      ]
  })  
  

</script>
