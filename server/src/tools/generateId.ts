let id = 0;
const generateId = (prefix?: string) => {
  const newId = prefix !== undefined ? `${prefix}_${id}` : `${id}`;
  id++;
  return newId;
};
export default generateId;
