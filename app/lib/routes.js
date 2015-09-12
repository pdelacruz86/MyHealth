Router.route('providers', {
  name: 'providers',
  controller: 'ProvidersController',
  action: 'details',
  where: 'client'
});

Router.route('profile', {
  name: 'profile',
  controller: 'ProfileController',
  action: '',
  where: 'client'
});