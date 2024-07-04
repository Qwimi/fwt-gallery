import type { ErrorObject } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { computed } from 'vue'

export const authRules = computed(() => ({
  emailValue: {
    required,
    email
  },
  passwordValue: { required }
}))

export const useValidationErrors = <T extends Record<keyof T, string>>(
  errors: ErrorObject[]
): Record<keyof T, string> => {
  return errors.reduce(
    (acc, value) => {
      return { ...acc, [value.$property]: value.$message }
    },
    {} as Record<keyof T, string>
  )
}
