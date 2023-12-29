import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const MaterialSelect = ({
    selectList, title, itemSelect, setItemSelect, myStyle={}
}) => {
    return (
        <FormControl fullWidth size="small" sx={myStyle}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select duration"
            value={itemSelect}
            onChange={e=>setItemSelect(e.target.value)}
        >
            <MenuItem value=''>All</MenuItem>
            {
                selectList.map((sl,i)=><MenuItem key={i}  value={sl}>{sl}</MenuItem>)
            }
            </Select>
        </FormControl>
    );
};

export default MaterialSelect;