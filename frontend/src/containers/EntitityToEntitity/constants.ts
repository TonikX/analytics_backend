const HIERARCHY = '1'
const NOT_DEFINED = '0'
const SAME_PARENT = '2'
const HAVE_PREREQUISITE = '4'
const SYNONYMS = '5'
const NO = 'None'

export const relations: {[key: string]: string} = {
  [NOT_DEFINED]: 'Неопределенное',
  [HIERARCHY]: 'Включает в себя',
  [SAME_PARENT]: 'Является частью одного раздела',
  [HAVE_PREREQUISITE]: 'Имеет пререквизит',
  [SYNONYMS]: 'Тождество',
  [NO]: 'Отсутствует',
}