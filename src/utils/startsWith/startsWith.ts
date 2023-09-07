export const startsWith = (startingChar: string | number, dataToCheck?: string | number) => {
  if (!dataToCheck) {
    return false;
  }

  return dataToCheck.toString().charAt(0) === startingChar.toString();
};
