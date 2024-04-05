const express= require("express")

const bodyParser= require('body-parser')

const cors= require('cors') 

// const  {PrismaClient}  = require('@prisma/client');

// const prisma = new PrismaClient();

const app=express()

app.use(bodyParser.json())

app.use(cors())

const newuser= require('./Routes/student')

const new_todo= require('./Routes/todos')

const events= require('./Routes/event')

const participant_s= require('./Routes/participant')

app.use('/api',newuser)

app.use('/api_1',new_todo)

app.use('/api_2',events)

app.use('/api_3',participant_s)


//INSERTING VALUES

// async function insertingvalues()
// {

    
//      try{

//         const existing= await prisma.student.findUnique({
//             where:{
//                 email:'dasomm308@gmail.com',
//             },
//         })

//         if(existing)
//         {
//            console.log("user already exists")
//            return;
//         }

//         const newStudent= await prisma.Student.create({
//           data:{   
//             username:'omm',
//             password:'okd@2024',
//             Firstname:'mitul',
//             lastname:'das',
//             email:'dasomm308@gmail.com',
//             phonenumber:'9521794065',
//             Gender:'male',
//             Regno:'2103',
//           },
//         })

//         console.log('Created new student',newStudent)

//      } catch(err)
//      {

//         console.error('Error creating user:', err);

//      } finally{
//              await prisma.$disconnect();
//      }
// }


// insertingvalues()



//UPDATING FEILD


// async function updatefeild()
// {
//       try{


//         const exist= await prisma.student.findUnique({
//             //explicitly using AND
//             where:{
//                 id:1,
//                 username:'omm',
//             },
//         })

//         if(!exist)
//         {
//             console.log("Student does not exist")
//             return
//         }
//         else{
//             console.log("Student data Updated",exist)
//         }
       

//         // const res= await prisma.student.update({

//         //     where:{
//         //         id:2,
//         //     },

//         //     data:{
//         //         lastname:'kumar'
//         //     }
//         // })


//             // console.log("Student data Updated",res)
        

        

//       }catch(err)
//       {
//         console.log("Error occured-->",err)

//       }finally{

//         await prisma.$disconnect()
//       }
// }

// updatefeild()


app.listen(3000,()=>{
    console.log(`Server running on port->3000`)
})
 
 