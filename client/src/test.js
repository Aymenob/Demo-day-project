function PageSplitter(collection,itemPerPage) {
    this.collection=collection
    this.itemPerPage=itemPerPage
}

PageSplitter.prototype.itemsCount=function () {
    return this.collection.length
}

PageSplitter.prototype.pageCount=function () {
    return Math.ceil(this.collection.length/this.itemPerPage)
}
PageSplitter.prototype.pageItemCount=function (pageIndex) {
    if(pageIndex+1>this.pageCount||pageIndex<0){
    return -1
}
   return this.itemPerPage-Math.ceil(this.pageIndex+1*this.itemPerPage)%this.itemsCount()
}

PageSplitter.prototype.pageIndex=function (itemIndex) {
    if(itemIndex+1>this.itemsCount()||itemIndex<0){
    return -1
}
    return Math.ceil(this.itemIndex+1/this.itemPerPage)-1
}