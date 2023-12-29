import EditIcon from '@mui/icons-material/Edit';
const CreateButton = (props)=>{
    const {collapse} = props
    return (
        <div onClick={props.onClick} style={{width: collapse?45:'initial', padding: collapse?'0 0 0 11px':'0 16px 0 14px'}} className="action_btn"><EditIcon /> {collapse?'':<span>Create Assessment</span>}</div>
    )
}
export default CreateButton