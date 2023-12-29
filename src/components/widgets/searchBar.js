import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = ({
    placeholder, 
    onSearch, 
    size="10px",
    myStyle={}
}
    )=>{
    return(
        <div style={{alignSelf: 'center'}}>
             <Paper
                    sx={{ p: '0 2px', borderRadius: 22, backgroundColor: '#f4f4f4', display: 'flex', alignItems: 'center', ...myStyle}}
                    >
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder={placeholder}
                        onChange={onSearch}
                        inputProps={{ 'aria-label': placeholder }}
                    />
                    <IconButton type="submit" sx={{ p: size}} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
        </div>
    ) 
}
export default SearchBar