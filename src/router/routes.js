
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/films/:id', component: () => import('pages/Film.vue') },
      { path: '/films', component: () => import('pages/Films.vue') },
      { path: '/people/:id', component: () => import('pages/Person.vue') },
      { path: '/people', component: () => import('pages/People.vue') },
      { path: '', redirect: '/films' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
