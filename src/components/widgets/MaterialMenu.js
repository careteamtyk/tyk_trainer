import React, { useState } from 'react';
import { StyledMenu } from './StyledMenu';
import { MenuItem } from '@mui/material';

const MaterialMenu = ({menuList, onItemSelect, anchorEl, setAnchorEl}) => {
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };
    const onItemClick = (event, mv)=>{
        event.stopPropagation()
        handleClose(); 
        onItemSelect(mv)
    }
    return (
        <StyledMenu
                    onClick={(event) => event.stopPropagation()}
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >  
                {
                    menuList.map((mv, i)=> <MenuItem key={i} onClick={(event)=>{onItemClick(event, mv)}} disableRipple>
                    {mv}
                    </MenuItem>)
                }
            </StyledMenu>
    );
};

export default MaterialMenu;