 const  {PrismaClient}  = require('@prisma/client');

const prisma = new PrismaClient();



//creating an student id in database

const addingstudent= async(req,res)=>{

   try{

    const{name,pass,firstname,last,emai,phone,gen,regno,ag}=req.body;

    const existing= await prisma.student.findUnique({
        where:{
            email:emai,
        },

        select:{
          email:true,
          username:true,
        }
    })

    if(existing)
    {
        console.log(existing)
        return res.status(200).json({
          message:"Student already registered"
        })
    }

    const newStudent=await prisma.student.create({

        data:{   

            username:name,
            password:pass,
            Firstname:firstname,
            lastname:last,
            email:emai,
            phonenumber:phone,
            Gender:gen,
            Regno:regno,
            Age:ag,

          },


    });

    console.log(newStudent);

    return res.status(201).json({
        message:newStudent
    });
        
    

   }
   catch(err)
   
   {

     return res.status(500).json({
        message:err
     })

   }

   finally
   {
     await prisma.$disconnect()
   }
}


//Deleting an student account  from database


const deletingstudent= async(req,res)=>{
   
  try{
      

    // deleting a single student id


      // const{student_id}=req.query;

      // const deletedstudent= await prisma.student.delete({
      //   where:{
      //     id:parseInt(student_id),
      //   },
      // })

      // console.log(deletedstudent)

      // return res.status(204).json({
      //   message:"Account deleted successfully"
      // })


      //deleting multiple student account

      const{ag}= req.query

      const deletedusers= await prisma.student.deleteMany({
        where:{
          Age:parseInt(ag),
        }
      })

      console.log(deletedusers)

      return res.status(204).send("Deleted successfully")







  }catch(err)
  {
    return res.status(500).json({
      message:err
    })
       
  }finally{

    await prisma.$disconnect()
    console.log("Connection closed")
  }

}

const gettingtodos_ofeach_student= async(req,res)=>{
   try{
      
      const {student_id}=req.query

      const todolist= await prisma.student.findUnique({

          where:{
            id:parseInt(student_id),
          },
          // //nested select 

          // select:{
          //   id:true,
          //   username:true,
          //   todo:{


          //     select:{
          //       id:true,
          //       title:true,
          //       description:true
          //     }

          //   },
          // }
          

          //applying filtering in relation feild
          select:{
            id:true,
            username:true,
            todo:{
              
              orderBy:{
                title:'asc',
              },
              select:{
                title:true,
                description:true
              }
            }
          }


         

       

          //getting all details of student

          // include:{
          //   todo:{
          //     select:{
          //       id:true,
          //       title:true,
          //       description:true,
          //     }
          //   }
          // }
        
      })

      if(!todolist)
      {
        return res.json({
          message:"No todos exist "
        })
      }

      console.log(todolist)

      return res.json({
        message:todolist
      })
     


   }catch(err)
   {
    return res.status(500).json({
      message:err
    })
      
   }finally{
    await prisma.$disconnect()
   }
}

//updating an existing user todo using nested writes


const updating_using_nestedwrites= async(req,res)=>{
  try{
    
    const{student_id,titl,des}=req.body

    const newTod= await prisma.student.create({

      where:{
        id:student_id,
      },

      data:{
        todo:{
          create:[
            {
              title:titl,
              description:des,
            }
          ]
        },
      },

      select:{
        id:true,
        username:true,
        todo:{
          select:{
            title:true,
            description:true,
          }
        }
      }

    })

    console.log(newTod)

    return res.status(201).json({
      message:newTod
    })

  }catch(err)
  {
    return res.status(500).json({
      message:"error occured"
    })
  }
  finally{
    await prisma.$disconnect()
  }
}


module.exports={
     addingstudent,
     deletingstudent,
     gettingtodos_ofeach_student,
     updating_using_nestedwrites
}