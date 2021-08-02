class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //search room by location

    search () {
        const location = this.queryString.location ? {
            address :{
                $regex : this.queryString.location,
                $options : 'i'
            }
        } :{}

        this.query = this.query.find({ ...location });
        return this;
    }

    filter () {

        const queryCopy = { ...this.queryString}

        //remove fields from query

        const removeFields = ['location']

        removeFields.forEach(el => delete queryCopy[el]);

        this.query = this.query.find(queryCopy);
        return this;
        
    }

}

export default APIFeatures;