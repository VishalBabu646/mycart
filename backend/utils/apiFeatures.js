class apiFeatures{
    constructor(query,queryStr){
        // console.log('query',query,'  ','queryStr',queryStr)
        this.query = query,
        this.queryStr = queryStr

    }
    search(){
        let keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options : 'i'
            }
        } : {};
        // console.log('keyword',keyword);
        this.query.find({...keyword});
        // console.log('...',{...keyword});
        // console.log('this',this);
        return this;

    }
     filter(){
        const queryStrCopy = { ...this.queryStr };
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        const mongoQuery = {};

        for (const key in queryStrCopy) {
            const match = key.match(/^(.+)\[(.+)\]$/);
            if (match) {
                const field = match[1];      
                const operator = `$${match[2]}`; 
                if (!mongoQuery[field]) {
                mongoQuery[field] = {};
                }

                mongoQuery[field][operator] = isNaN(queryStrCopy[key])
                ? queryStrCopy[key]
                : Number(queryStrCopy[key]);
            } else {
                mongoQuery[key] = isNaN(queryStrCopy[key])
                ? queryStrCopy[key]
                : Number(queryStrCopy[key]);
            }
            }

        this.query.find(mongoQuery);

        return this;

}
}
module.exports = apiFeatures;