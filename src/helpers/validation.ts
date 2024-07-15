import type { ErrorObject } from '@vuelidate/core';
import { email, minLength, required, helpers } from '@vuelidate/validators';
import { computed } from 'vue';

// form validation rules

export const authRules = computed(() => ({
  emailValue: {
    required,
    email
  },
  passwordValue: { required }
}));

export const artistRules = computed(() => ({
  name: { required },
  description: { required },
  yearsOfLife: { required },
  genres: {
    required,
    minLenght: helpers.withMessage('You should select at least 2 genres', minLength(2))
  }
}));

export const paintingRules = computed(() => ({
  name: { required },
  yearOfCreation: { required },
  image: { required }
}));

// convert variables to form data

export const toFormData = (form: Object) => {
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if ((key === 'avatar' || key === 'image') && !(value instanceof File)) return;

    if (Array.isArray(value)) {
      value.forEach((element: any) => formData.append(key, element));
      return;
    }

    formData.append(key, value || null);
  });
  return formData;
};

// get validation errors

export const useValidationErrors = <T extends Record<keyof T, string>>(
  errors: ErrorObject[]
): Record<keyof T, string> => {
  return errors.reduce(
    (acc, value) => {
      return { ...acc, [value.$property]: value.$message };
    },
    {} as Record<keyof T, string>
  );
};
