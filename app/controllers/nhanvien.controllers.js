const ApiError = require("../api-error");
const NhanVienService = require("../services/nhanvien.services");
const MongoDB = require("../utils/mongodb.utils");


exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.error("Error during create operation:", error); // Log lỗi
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nhanvienService = new NhanVienService(MongoDB.client);
    const {name} = req.query;
    if(name){
        documents = await nhanvienService.findByName(name);
    } else{
        documents = await nhanvienService.find({});
    }
  } catch (error) {
    return next(
        new ApiError(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
 try {
     const nhanvienService = new NhanVienService(MongoDB.client);
     const document = await nhanvienService.findById(req.params.id);
     if(!document){
        return next(new ApiError(404, "Contact not found"));
     }
     return res.send(document);
 } catch (error) {
    return next(
        new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
 }
};
exports.update = async (req, res, next) => {
  if(Object.keys(req.body).length == 0){
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const nhanvienService = new NhanVienService(MongoDB.client);
    const document = await nhanvienService.update(req.params.id, req.body);
    if(!document){
        return next(new ApiError(404, "Contact not found"));
    }
    return res.send({message: "Contact was updated successfuly"});
  } catch (error) {
    return next(
        new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};
exports.delete = async (req, res, next) => {
 try {
      const nhanvienService = new NhanVienService(MongoDB.client);
      const document = await nhanvienService.delete(req.params.id);
      if(!document){
        return next(new ApiError(404, "Contact not found"));
      }
      return res.send({message: "Contact was deleted successfuly"});
 } catch (error) {
    return next(
        new ApiError(
            500, `Could not delete contact with id=${req.params.id}`
        )
    );
 }
};
exports.deleteAll = async (req, res, next) => {
  try {
      const nhanvienService = new NhanVienService(MongoDB.client);
      const deleteCount = await nhanvienService.deleteAll();

      return res.send(`${deleteCount} contact were deleted successfuly`);
 } catch (error) {
    return next(
        new ApiError(
            500, "An error occurred while removing all contacts"
        )
    );
 }
};
exports.findAllFavorite = async (_req, res, next) => {
   try {
      const nhanvienService = new NhanVienService(MongoDB.client);
      const document = await nhanvienService.findFavorite();
      return res.send(document);
 } catch (error) {
    return next(
        new ApiError(500, "An error occurred while retrieving favorite contacts")
    );
 }
};
