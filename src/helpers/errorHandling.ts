import { AxiosError } from 'axios';
import { ref, type Ref } from 'vue';
import { useModalStore } from '@/stores/modalStore';

export default function handleError(error: unknown) {
  const message: Ref<string | null> = ref(null);
  if (error instanceof AxiosError) {
    message.value = error.response?.data.message;
  } else if (error instanceof Error) {
    message.value = error.message;
  } else if (typeof error === 'string') {
    message.value = error;
  } else {
    message.value = 'An unknown error occurred';
  }

  useModalStore().setToastMessage(message.value!!);

  setTimeout(() => useModalStore().setToastMessage(null), 5000);
}
