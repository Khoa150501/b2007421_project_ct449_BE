const {ObjectId, ReturnDocument} = require("mongodb");

class BooksService {
    constructor(client){
        this.Book = client.db().collection("sach");
    }

    //csdl su dung mongodb api
    extractBooksData(payload) {
        const books = {
            MASACH: payload.MASACH,
            TENSACH: payload.TENSACH,
            DONGIA: payload.DONGIA,
            SOQUYEN: payload.SOQUYEN,
            NAMXUATBAN: payload.NAMXUATBAN,
            MANXB: payload.MANXB,
        };

        Object.keys(books).forEach(
            (key) => books[key] == undefined && delete books[key]
        );
        return books;
    }

    async create(payload) {
        const books = this.extractBooksData(payload);
        const result = await this.Book.findOneAndUpdate(
             books,
            {$set: {favorite: books.favorite == true}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }
    //
    async find(filter){
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
    }
    async findById(id){
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Book.findOneAndUpdate(
            filter, {$set: update},
                    {returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id){
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});
    }
    async deleteAll(){
        const result = await this.Book.deleteMany({});
        return result.deleteCount;
    }
}
module.exports = BooksService;