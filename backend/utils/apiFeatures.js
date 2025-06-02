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
        const queryStrCopy = {...this.queryStr};
        const removeFields = ['keyword','page','limit'];
        removeFields.forEach(field => delete queryStrCopy[field]);
        this.query.find(queryStrCopy);
        return this;
    }
}

module.exports = apiFeatures;