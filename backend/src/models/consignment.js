


const consignment= sequelize.define("consignment",{

    consignment_name: {
       type:DataTypes.STRING,
       allowNull:false 
    },

    consignment_category:{
        type:DataTypes.STRING,
        allowNull:false 
    },

    consignment_quantity:{
        type:DataTypes.STRING,
        allowNull:false 
    },

    consignment_origin: {
        type:DataTypes.STRING,
        allowNull:false 
    },

    consignment_destination: {
        type:DataTypes.STRING,
        allowNull:false
    },

    exporter_id:{
        type:DataTypes.STRING,
        allowNull:false 
    },

    status: {
        type:DataTypes.STRING, 
    } ,

    created_at: {
        type:DataTypes.DATE,
        allowNull:false 
    },

    updated_at: {
        type:DataTypes.DATE,
    },

    consignment_id: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    assigned_qa_id :{
        type:DataTypes.STRING,
        allowNull:true 
    },

    qa_report_id :{
    type:DataTypes.STRING,
        allowNull:true
    },

    dpp_certificate_id :{
        type:DataTypes.STRING,
        allowNull:true 
    },

    qr_url :{
        type:DataTypes.STRING,
        allowNull:true 
    },
    
    
})

module.exports=consignment