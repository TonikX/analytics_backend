import {ProfessionType} from '../types'

export interface ProfessionsSelectListProps {
  professions: Array<ProfessionType>
  selectProfession: (item: ProfessionType) => void
  unselectProfession: (item: ProfessionType) => void
  selectedProfessions: Array<ProfessionType>
}