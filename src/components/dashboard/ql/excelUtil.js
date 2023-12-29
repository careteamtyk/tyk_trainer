import { cleanO, getPhone } from "../../../utilities/utility"

const processData = (rows)=>{
    let ra = []
    rows.map((r, i)=>{
        //t, q, a, b, c, d, e, f, a
        //0, 1, 2, 3, 4, 5, 6, 7, 8
        let topic = cleanO(r[0])
        let qn = cleanO(r[1])
        let oa = cleanO(r[2])
        let ob = cleanO(r[3])
        let oc = cleanO(r[4])
        let od = cleanO(r[5])
        let oe = cleanO(r[6])
        let of = cleanO(r[7])
        let ops = []
        let answer = cleanO(r[8])
        answer = answer.toUpperCase()
        ops.push({option: oa, isCorrect: answer === 'A'})
        ops.push({option: ob, isCorrect: answer === 'B'})
        if(oc !== "")
            ops.push({option: oc, isCorrect: answer === 'C'})
        if(od !== "")
            ops.push({option: od, isCorrect: answer === 'D'})
        if(oe !== "")
            ops.push({option: oe, isCorrect: answer === 'E'})
        if(of !== "")
            ops.push({option: of, isCorrect: answer === 'F'})
                    
        let qq = {
            topic: r[0], question: qn,  options: ops,
            formatCorrect: formatChecker(topic, qn, oa, ob, answer, ops),
            phone: getPhone(),
            status: "Active",
            createdOn: new Date(),
            updatedOn: new Date()
        }
        ra.push(qq)
    })
    return ra
}
const formatChecker = (topic, qns, oa, ob, ans, oar)=>{
    let ops = ['A', 'B', 'C', 'D', 'E', 'F']
    let ocnd = ops.indexOf(ans.toUpperCase())
    let cond1 = qns !== null && oa !== null & ob !== null && ans !== null
    let cond2 = qns !== "" && oa !== "" & ob !== "" && ans !== ""
    let cond3 = ocnd>=0 && ocnd <=5 && ocnd < oar.length
    return topic !== "" && cond1 && cond2 && cond3
}
const excelAnswer = (ar)=>{
    let ops = ['A', 'B', 'C', 'D', 'E', 'F']
    let ans = ""
    ar.map((a, i)=>{
        if(!!a.isCorrect){
            ans = ops[i]
        }
    })
    return ans
}
export {processData, formatChecker, excelAnswer}