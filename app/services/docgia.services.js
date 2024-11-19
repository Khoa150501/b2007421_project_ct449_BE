const {ObjectId, ReturnDocument} = require("mongodb");

class DocGiaService {
    constructor(client){
        this.Docgia = client.db().collection("DOCGIA");
    }

    //csdl su dung mongodb api
    extractDocGiaData(payload) {
        const docgia = {
            MADOCGIA: payload.MADOCGIA,
            HOLOT: payload.HOLOT,
            TEN: payload.TEN,
            NGAYSINH: payload.NGAYSINH,
            PHAI: payload.PHAI,
            DIACHI: payload.DIACHI,
            DIENTHOAI: payload.DIENTHOAI,

        };

        Object.keys(docgia).forEach(
            (key) => docgia[key] == undefined && delete docgia[key]
        );
        return docgia;
    }

    async create(payload) {
        const docgia = this.extractDocGiaData(payload);
        const result = await this.Docgia.findOneAndUpdate(
             docgia,
            {$set: {favorite: docgia.favorite == true}},
            {returnDocument: "after", upsert: true}
        );
        return result;
    }
    //
    async find(filter){
        const cursor = await this.Docgia.find(filter);
        return await cursor.toArray();
    }
    async findByName(name){
        return await this.find({
            name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
        });
    }
    async findById(id){
        return await this.Docgia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Docgia.findOneAndUpdate(
            filter, {$set: update},
                    {returnDocument: "after"}
        );
        return result.value;
    }
    async delete(id){
        const result = await this.Docgia.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
    async findFavorite(){
        return await this.find({favorite: true});
    }
    async deleteAll(){
        const result = await this.Docgia.deleteMany({});
        return result.deleteCount;
    }
}
module.exports = DocGiaService;