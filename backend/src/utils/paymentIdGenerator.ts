export const paymentIdGenerator = () => {
  return Math.random().toString(36).substring(2, 9);
};
