let resolveSubscription;

const subscriptionPromise = new Promise((resolve) => {
  resolveSubscription = resolve;
});

export { resolveSubscription, subscriptionPromise };