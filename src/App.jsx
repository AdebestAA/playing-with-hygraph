import { useEffect, useState } from 'react'
import './App.css'
import { GraphQLClient, gql } from 'graphql-request';



const hygraphEndpoint = "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/cm02j3jr601qv07tfqosnornv/master"
const hygraphClient = new GraphQLClient(hygraphEndpoint)

const getIntroductionData = async()=>{
  const query = gql `
query MyQuery {
  questions {
    correctAnswer
    quest
    options
  }
}
  `

  const response = await hygraphClient.request(query)
  return response
}

 
function App() {
const [questionsFromHygraph,setQuestionsFromHygraph] = useState([])

useEffect(()=>{

getDataMyData()

},[])
 const getDataMyData = async()=>{
   const getData =  await getIntroductionData()
   console.log(getData);

  //  destructure your data
   const {questions} = getData
    console.log(questions);
 setQuestionsFromHygraph(questions)
  }



  return (
  <div className=''>
   

   <h1 className='mx-2 bg-red-500 text-center'>Questions for Messi fans that dont want to accept roanldo as the goat</h1>

<div>
  {questionsFromHygraph.map((eachQuest,index)=>{

    return (
        <section key={index} className='my-2 px-2'>
          <h1 className='text-center'>Question {index + 1}</h1>
    <h5 className='font-bold bg-blue-100'>{eachQuest.quest}</h5>
    <aside>
     {eachQuest.options.map((eachOption,index)=>{
       return (
        <p className='cursor-pointer bg-red-500 my-2 font-semibold hover:bg-red-100 active:bg-red-100' key={index} onClick={(e)=>{
if (eachOption !== eachQuest.correctAnswer) {
  window.alert("wrong answer...you must accept Ronaldo as the GOAT")
 
} 
if (eachOption === eachQuest.correctAnswer) {
    window.alert("yea,your are right, Ronaldo is the GOAT")
}
        }}>{eachOption}</p>
       )
     })}
    </aside>
  </section>
    )
  })}
</div>

  </div>
  )
}

export default App
