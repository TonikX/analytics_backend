export interface TableSettingsMenuProps {
    handleCloseMenu: Function;
    handleOpenMenu: Function;
    anchorEl: any;
    menuItems: Array<{
        link?: string;
        text?: string;
        icon?: React.ReactElement;
        handleClickItem?: Function;
    }>
}
