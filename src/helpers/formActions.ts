// convert variables to form data

export const toFormData = (form: Object) => {
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if ((key === 'avatar' || key === 'image') && !(value instanceof File)) return;

    if (Array.isArray(value)) {
      value.forEach((element: any) => formData.append(key, element));

      return;
    }

    formData.append(key, value.trim() || null);
  });

  return formData;
};
