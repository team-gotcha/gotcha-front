export const useGetTodayDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return today.toLocaleDateString('ko-KR', options);
};

export const useGetTodayDateDotFormat = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return today.toLocaleDateString('ko-KR', options).replace(/\./g, '.');
};

export const formatDateString = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'ko-KR',
    options
  );
  return formattedDate.replace(/\./g, '.');
};
