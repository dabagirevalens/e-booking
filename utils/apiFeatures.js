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

    //Filter the query string

    filter () {

        const queryCopy = { ...this.queryString}

        //remove fields from query

        const removeFields = ['location', 'page']

        removeFields.forEach(el => delete queryCopy[el]);

        this.query = this.query.find(queryCopy);
        return this;

    }

    //Adding pagination features

    pagination (resultPerPage) {
        const currentPage = +this.queryString.page || 1;
        const skip = resultPerPage * (currentPage -1 );

        this.query  = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}

export default APIFeatures;