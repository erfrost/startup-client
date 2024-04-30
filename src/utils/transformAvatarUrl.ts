export const transformAvatar = (url: string) => {
  if (!url) return "https://www.svgrepo.com/show/452030/avatar-default.svg";
  else return url;
};

export default transformAvatar;
