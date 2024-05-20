// import { beforeEach, describe, it } from 'node:test'
// import { createPinia, setActivePinia, type Store, type _UnwrapAll } from 'pinia'
// import { useThemeStore } from '@/stores/themeStore'
// import { expect } from 'chai'
// import type { Ref } from 'vue'

// describe('data store test', () => {
//   let store: Store<
//     'theme',
//     _UnwrapAll<Pick<{ isThemeLight: Ref<boolean>; toggleTheme: () => void }, 'isThemeLight'>>,
//     Pick<{ isThemeLight: Ref<boolean>; toggleTheme: () => void }, never>,
//     Pick<{ isThemeLight: Ref<boolean>; toggleTheme: () => void }, 'toggleTheme'>
//   > | null = null
//   beforeEach(() => {
//     setActivePinia(createPinia())
//     store = useThemeStore()
//   })

//   it('init with isLightTheme is true', () => {
//     expect(store.isThemeLight).to.equal(true)
//   })
// })
