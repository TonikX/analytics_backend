import {ProfessionType} from '../types'

export interface ProfessionItemProps {
  style?: any,
  profession: ProfessionType,
  selectProfession: (item: ProfessionType) => void,
  unselectProfession: (item: ProfessionType) => void,
  mode: string,
}
