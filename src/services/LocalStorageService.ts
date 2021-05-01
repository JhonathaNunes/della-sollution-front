export const addData = (key: string, content: any) => {
  const data = JSON.stringify(content);
  localStorage.setItem(key, data);
};

export const getData: any = (key: string) => JSON.parse(
  String(localStorage.getItem(key)),
);

export const deleteData = (key: string) => localStorage.removeItem(key);

export const clearStorage = () => localStorage.clear();
