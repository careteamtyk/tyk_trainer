import ExcelUpload from "./optionmodes/excelUpload"
import ManualCreation from "./optionmodes/manualCreation"
import ManualSelection from "./optionmodes/manualSelection"
import RandomSelection from "./optionmodes/randomSelection"
import './trainer.css'
const SelectionMode = (props)=>{
  const {option, assessment, questions, banner, setQuestions, at, ad, setS} = props
    return (<div className='mode_selection_c'>
      {option==="option1"?<RandomSelection assessment={assessment} banner={banner} questions={questions} setQuestions={setQuestions} at={at} ad={ad} setS = {setS} />:
      (option==="option2"?<ManualSelection assessment={assessment} banner={banner} questions={questions} setQuestions={setQuestions} at={at} ad={ad} setS = {setS} />:
      (option==="option3"?<ExcelUpload assessment={assessment} banner={banner} questions={questions} setQuestions={setQuestions} at={at} ad={ad} setS = {setS} />:
      <ManualCreation assessment={assessment} banner={banner} questions={questions} setQuestions={setQuestions} at={at} ad={ad} setS = {setS} />))} 
    </div>)
}
export default SelectionMode