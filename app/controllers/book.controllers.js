const ApiError = require("../api-error");
const BooksService = require("../services/book.services");
const MongoDB = require("../utils/mongodb.utils");


exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const booksService = new BooksService(MongoDB.client);
        const document = await booksService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const booksService = new BooksService(MongoDB.client);
    const {name} = req.query;
    if(name){
        documents = await booksService.findByName(name);
    } else{
        documents = await booksService.find({});
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
     const booksService = new BooksService(MongoDB.client);
     const document = await booksService.findById(req.params.id);
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
    const booksService = new BooksService(MongoDB.client);
    const document = await booksService.update(req.params.id, req.body);
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
      const booksService = new BooksService(MongoDB.client);
      const document = await booksService.delete(req.params.id);
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
      const booksService = new BooksService(MongoDB.client);
      const deleteCount = await booksService.deleteAll();

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
      const booksService = new BooksService(MongoDB.client);
      const document = await booksService.findAllFavorite();
      return res.send(document);
 } catch (error) {
    return next(
        new ApiError(500, "An error occurred while retrieving favorite contacts")
    );
 }
};
