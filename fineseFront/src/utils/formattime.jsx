export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
};
export const currentDate =  () => {
  const currentDate = new Date();
  const options = {month: 'long',  year: 'numeric' };
  const formattedDate = currentDate.toLocaleString('en-US', options);
  return formattedDate
}
export const currentFullDate =  () => {
  const currentDate = new Date();
  const options = {month: 'long',day:"numeric",  year: 'numeric' };
  const formattedDate = currentDate.toLocaleString('en-US', options);
  return formattedDate
}
