

import notifyIcon from '../../assets/images/notify_icon.png'
import profileIcon from '../../assets/images/profile_icon.png'
import settingsIcon from '../../assets/images/settings_icon.png'
import RatulMenuIcon from '../widgets/ratulMenuIcon'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LockResetIcon from '@mui/icons-material/LockReset';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './header.css'
import { deleteToken } from '../../utilities/utility'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = (props)=>{
    const {collapse, setCollapse, title} = props
    const [showNotifications, setShowNotifications] = useState(false)
    let temp = title.replaceAll('-', " ")
    const mytitle = capitalize(temp)

    const [anchorEl, setAnchorEl] = useState(null);
    
    const accountClick = (event)=>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    function capitalize(str) {
        const words = str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
        return words;
    }
    const goToReset = ()=>{
      document.location.href = "/generate-reset-link"
    }
    const goToProfile = ()=>{
      document.location.href = "/trainer/trainer-profile"
    }
    const logout = ()=>{
      deleteToken()
      document.location.href="/login"
    }
    return(
        <div className='dashboard_header' style={{paddingLeft: collapse?90:248}}>
            <RatulMenuIcon collapse={collapse} setCollapse={setCollapse} />
        <div style={{flex: 1, paddingLeft: 12, alignSelf: 'center', fontSize: 20, fontWeight: 600}}>{mytitle}</div>
        <div style={{alignSelf: 'center', marginRight: '8px', position: 'relative'}}>
            <IconButton onClick={()=>setShowNotifications(!showNotifications)}>
                <NotificationsNoneIcon sx={{color: '#777', fontSize: '30px'}}/>
            </IconButton>
            <div className={showNotifications?'notification-tray':'notification-tray hide'}>
            <IconButton onClick={()=>setShowNotifications(false)} className='close-btn-icon' aria-label="delete" size="small">
                <CloseIcon />
            </IconButton>
                <div style={{color: '#777', textAlign: 'center', marginTop: '18px'}}>No Notifications Found</div>
            </div>

        </div>
        <div style={{alignSelf: 'center', borderRadius: '50%', marginRight: '16px'}}>
        <IconButton aria-describedby={id} onClick={accountClick} aria-label="account" size="large">
            <ManageAccountsIcon />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <MenuList>
                <MenuItem onClick={goToProfile}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={goToReset}>
                    <ListItemIcon>
                      <LockResetIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Reset Password</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </MenuList>
            </Popover>
        </div>

        {/* <img style={{width: 48, height: 48, alignSelf: 'center', marginLeft: 20, marginRight: 20, cursor: 'pointer'}} src={profileIcon} alt=''/> */}
        </div>
    )
}
export default Header