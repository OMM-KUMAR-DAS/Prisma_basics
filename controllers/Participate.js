const {PrismaClient}= require('@prisma/client')


const prisma= new PrismaClient()


//adding participate to a particular event

const adding_participant= async(req,res)=>{


    try{
        

        // const {event_id}= req.params

        // model Participant {
        //     id          Int               @id @default(autoincrement())
        //     name        String           
        //     rollNumber  String            @unique
        //     course      String
        //     year        String
        //     branch      String
        //     gender      String
        //     phone       Int
        //     email       String            @unique
        //     events      Event[]
        //     createdAt   DateTime          @default(now())
        //     updatedAt   DateTime          @default(now())
        // }

        const  {name,rollNumber,course,year,branch,phone,email,event_id}= req.body

        const anss= await prisma.participant.create({

            data:{
              name:name,
              rollNumber:rollNumber,
              course:course,
              year:year,
              branch:branch,
              gender:"boys",
              phone:phone,
              email:email,
              events:{
                connect:[
                    {id:event_id}
                ]
              }
            },
            include:{
                events:true,
            }
            

        })

        console.log(anss)

        return res.status(201).json({
            message:anss,
        })

    }catch(err)
    {
        console.log("error occured")
        return res.status(500).json({
            message:err
        })
    }finally{
        await prisma.$disconnect()
    }
}

//participants list of a particular event

const getting_p= async(req,res)=>{

    try{

        const{event_id}=req.query

        const lis= await prisma.event.findUnique({
            
            where:{
                id:parseInt(event_id),
                gender:"boys"
            },

            include:{
                participants:true,
            }
        })
        
        console.log(lis.participants.length)

        if(lis.participants.length!==0)
        {
            return res.status(200).json({
                message:lis
            })
        }
        else{
            return res.status(200).json({
                message:"no participants"
            })
        }

    }catch(err)
    {
        return res.status(500).json({
            
        })

    }finally{

        await prisma.$disconnect()
    }
}

//removing a boy from an event

const deleting_boys= async(req,res)=>{
    try{

        const{email,event_id}=req.query
        const ans= await prisma.participant.update({
            where:{
                email:email,
            },
            
            data:{
                events:{
                    disconnect:[{id:parseInt(event_id)}]
                }
            }
        })

        console.log(ans)

        return res.status(201).json({
              message:"participant deleted"
        })

    }catch(err)
    {
        return res.status(501).json({
            message:err
        })

    }finally{
        await prisma.$disconnect();
    }
}


module.exports={
  
  adding_participant,  
  getting_p,
  deleting_boys

}