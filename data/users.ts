export const users = {
  standard: {
    username: process.env.TEST_USERNAME ?? 'standard_user',
    password: process.env.TEST_PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: process.env.TEST_PASSWORD ?? 'secret_sauce',
  },
} as const;
