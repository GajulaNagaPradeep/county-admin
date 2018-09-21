export const selectLoggedInUserAccount = state => {
  return state.fetchAccount.account ? state.fetchAccount.account.account : '';
};

export const userName = state => {
  const lastName =
    state.fetchAccount.account && state.fetchAccount.account.account.last_name
      ? state.fetchAccount.account.account.last_name
      : '';
  const firstName =
    state.fetchAccount.account && state.fetchAccount.account.account.first_name
      ? state.fetchAccount.account.account.first_name
      : '';
  return firstName + ' ' + lastName;
};
