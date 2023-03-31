import {WithStyles} from "@mui/material";
import styles from "./TextField.styles";

export interface TextFieldProps extends WithStyles<typeof styles> {
  onChange: Function;
  label?: string;
  noMargin?: boolean;
  defaultValue?: string;
  disabled?: boolean;
}