import React from "react";

export interface ConfirmRejectProps{
    onConfirm: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    onReject: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    value: string,
}
