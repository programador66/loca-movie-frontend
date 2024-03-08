export const convetDate = (date: Date = new Date) => {
    const data = new Date(date);

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    const dataFormatada = `${mes}/${dia}/${ano}`;
    return dataFormatada
}

export const validateForm = (obj:any) => {
    for (const chave in obj) {
      if (!obj[chave]) {
        return false;
      }
    }
    return true;
  }