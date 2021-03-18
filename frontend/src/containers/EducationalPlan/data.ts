const REQUIRED = 'Required';
export const OPTIONALLY = 'Optionally';
const OGNP_SET = 'OGNP_set';
const SET_SPECIALIZATION = 'Set_specialization';
const FACULTATIV = 'Facultativ';
const OPT = 'Opt_specialization';

export const typeOfWorkProgramInPlan = [
  {
    value: OPTIONALLY,
    label: "Дициплина по выбору",
  },
  {
    value: REQUIRED,
    label: "Обязательная",
  },
  {
    value: SET_SPECIALIZATION,
    label: "Часть специализации",
  },
  {
    value: FACULTATIV,
    label: "Факультативная",
  },
  {
    value: OGNP_SET,
    label: "ОГНП",
  },
  {
    value: OPT,
    label: "Выбор в специализации",
  },
];
