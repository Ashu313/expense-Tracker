const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const IncomeSchema=mongoose.Schema({
    
    title:{

        required:[true,'first name is require'],
        type:String,
    },
    description:{
        required:[true,'description name is require'],
        type:String
    },
    type: {
        type: String,
        default:"income",
      },

    
    amount:{
    
        required:[true,'amount  is require'],
        type:Number
    },
    user:{

       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:[true,'user id is required'],
    },
    date: {
        type: Date, // add a new date field to the schema
        default: Date.now(), // set the default value to the current date and time
      },
},

{
    timestamp:true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
       virtuals:true,
    },
    timestamps: true,
},

)
 IncomeSchema.plugin(mongoosePaginate);
const Income=mongoose.model('Income',IncomeSchema);
module.exports=Income;