export const products = {
  backpack: {
    id: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
  },
  bikeLight: {
    id: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
  },
} as const;

export const applicationPaths = {
  products: '/inventory.html',
  cart: '/cart.html',
  checkoutInformation: '/checkout-step-one.html',
  checkoutOverview: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
} as const;

export const checkoutCustomer = {
  firstName: 'Saesar',
  lastName: 'Yustiawan',
  postalCode: '12345',
} as const;

export const invalidLoginScenarios = [
  {
    title: 'invalid username',
    username: 'invalid_user',
    password: 'secret_sauce',
    expectedError: 'Username and password do not match',
  },
  {
    title: 'invalid password',
    username: 'standard_user',
    password: 'incorrect_password',
    expectedError: 'Username and password do not match',
  },
  {
    title: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Username is required',
  },
  {
    title: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Password is required',
  },
  {
    title: 'locked user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'this user has been locked out',
  },
] as const;
